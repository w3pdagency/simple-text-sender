
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# This would normally come from environment variables
API_KEY = "umaapikeyqueseraenviada"

@app.route('/v1/health', methods=['GET'])
def health_check():
    return "I'm here"

@app.route('/v1/message/sendText', methods=['POST'])
def send_text():
    # Check API key
    api_key = request.headers.get('apikey')
    if api_key != API_KEY:
        return jsonify({"error": "Invalid API key"}), 401
    
    data = request.json
    
    # Validate request data
    if not data or 'number' not in data or 'text' not in data:
        return jsonify({"error": "Missing required fields"}), 400
    
    number = data['number']
    text = data['text']
    
    # In a real application, you would integrate with a messaging service here
    # For this example, we'll just log and return success
    print(f"Sending message to {number}: {text}")
    
    return jsonify({
        "success": True,
        "message": "Message sent successfully",
        "data": {
            "number": number,
            "text": text
        }
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
