import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Spotify API credentials
SPOTIPY_CLIENT_ID = os.getenv('SPOTIPY_CLIENT_ID')
SPOTIPY_CLIENT_SECRET = os.getenv('SPOTIPY_CLIENT_SECRET')
SPOTIPY_REDIRECT_URI = os.getenv('SPOTIPY_REDIRECT_URI')

# Gemini API key
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

# Spotify authentication
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=SPOTIPY_CLIENT_ID,
                                               client_secret=SPOTIPY_CLIENT_SECRET,
                                               redirect_uri=SPOTIPY_REDIRECT_URI,
                                               scope="user-read-playback-state,user-modify-playback-state"))

# Gemini API configuration
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

def process_query(query):
    """Processes the user query using Gemini and controls Spotify."""
    try:
        # Send the query to Gemini
        response = model.generate_content(query)
        instruction = response.text

        # Parse the instruction and control Spotify
        if "play" in instruction.lower():
            if "song" in instruction.lower():
                # Extract song title and artist (example)
                song_title = instruction.split("song")[1].split("by")[0].strip()
                artist = instruction.split("by")[1].strip()
                
                # Search for the song
                results = sp.search(q=f"track:{song_title} artist:{artist}", type="track")
                if results['tracks']['items']:
                    song_uri = results['tracks']['items'][0]['uri']
                    sp.start_playback(uris=[song_uri])
                    return f"Playing {song_title} by {artist}"
                else:
                    return "Song not found"
            elif "playlist" in instruction.lower():
                # Extract playlist name (example)
                playlist_name = instruction.split("playlist")[1].strip()
                
                # Search for the playlist
                results = sp.search(q=f"playlist:{playlist_name}", type="playlist")
                if results['playlists']['items']:
                    playlist_uri = results['playlists']['items'][0]['uri']
                    sp.start_playback(context_uri=playlist_uri)
                    return f"Playing playlist {playlist_name}"
                else:
                    return "Playlist not found"
            else:
                return "I can play songs or playlists. Please specify."
        elif "pause" in instruction.lower():
            sp.pause_playback()
            return "Playback paused"
        elif "skip" in instruction.lower():
            sp.next_track()
            return "Skipping to the next track"
        else:
            return "I don't understand that command."
    except Exception as e:
        return f"An error occurred: {e}"

if __name__ == "__main__":
    while True:
        query = input("Enter your music request: ")
        if query.lower() == "exit":
            break
        result = process_query(query)
        print(result)
