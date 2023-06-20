import os
from dotenv import load_dotenv
from flask import Flask, render_template, jsonify
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from datetime import datetime, timedelta

# Load environment variables from .env file
load_dotenv()

# Set up Flask app
app = Flask(__name__)

# Set up Spotify API credentials and authentication
scope = "user-read-recently-played user-top-read playlist-modify-private"
client_id = os.getenv("SPOTIFY_CLIENT_ID")
client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")
redirect_uri = "http://localhost:8888/callback"
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope, client_id=client_id, client_secret=client_secret, redirect_uri=redirect_uri))

# Route for Spotify integration
@app.route('/spotify')
def spotify_integration():
    try:
        # Get the user's ID
        user_id = sp.current_user()['id']

        # Calculate the timestamp for the last hour
        last_hour = datetime.now() - timedelta(hours=1)
        last_hour_timestamp = int(last_hour.timestamp()) * 1000

        # Get user's recently played tracks from the last hour
        recent_tracks = sp.current_user_recently_played(limit=50, after=last_hour_timestamp)

        # Extract track IDs from the recently played tracks
        track_ids = [track['track']['id'] for track in recent_tracks['items']]

        # Get audio features for the recently played tracks
        audio_features = sp.audio_features(track_ids)

        # Filter out tracks with missing audio features
        audio_features = [track for track in audio_features if track is not None]

        if len(audio_features) > 0:
            # Extract relevant audio features for recommendations
            seeds = {
                'seed_tracks': track_ids[:5],
                'target_acousticness': sum(track['acousticness'] for track in audio_features) / len(audio_features),
                'target_danceability': sum(track['danceability'] for track in audio_features) / len(audio_features),
                'target_energy': sum(track['energy'] for track in audio_features) / len(audio_features),
                'target_instrumentalness': sum(track['instrumentalness'] for track in audio_features) / len(audio_features),
                'target_loudness': sum(track['loudness'] for track in audio_features) / len(audio_features),
                'target_tempo': sum(track['tempo'] for track in audio_features) / len(audio_features),
                'target_valence': sum(track['valence'] for track in audio_features) / len(audio_features)
            }

            # Generate recommendations
            recommendations = sp.recommendations(**seeds, limit=10)

            # Extract recommended track details
            recommended_tracks = recommendations['tracks']

            # Create a new playlist with a readable and unique name
            now = datetime.now()
            playlist_name = 'Hourly Recs ' + now.strftime("%b-%d-%Y %H:%M")
            playlist_description = 'Song recommendations based on your last hour of listening'
            playlist = sp.user_playlist_create(user=user_id, name=playlist_name, public=False, description=playlist_description)

            # Extract the playlist details
            playlist_id = playlist['id']
            playlist_uri = playlist['uri']

            # Add recommended tracks to the playlist
            sp.playlist_add_items(playlist_id, [track['uri'] for track in recommended_tracks])

            # Prepare the response data
            response_data = {
                'playlistCreated': True,
                'playlistName': playlist_name,
                'playlistDescription': playlist_description,
                'recommendedTracks': recommended_tracks
            }
        else:
            response_data = {
                'playlistCreated': False
            }
    except spotipy.SpotifyException as e:
        print("Error occurred during Spotify API request:", str(e))
        response_data = {
            'error': 'An error occurred during the Spotify API request.'
        }
    except Exception as e:
        print("Error occurred:", str(e))
        response_data = {
            'error': 'An error occurred.'
        }

    return jsonify(response_data)

# Route for the homepage
@app.route('/')
def home():
    return render_template('spotify_integration.html')

if __name__ == '__main__':
    app.run(debug=True)
