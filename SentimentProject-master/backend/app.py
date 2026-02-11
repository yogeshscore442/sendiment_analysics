from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob
from datetime import datetime
import os

app = Flask(__name__)
# In production, we limit CORS to your specific website URL
CORS(app)

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        url = data.get('url', '')
        
        # Simulated analysis of multiple reviews for the charts
        # 'good', 'moderate', 'bad' percentages
        distribution = {"good": 70, "moderate": 20, "bad": 10}
        
        result = {
            "url": url,
            "sentiment": "Positive",
            "score": 75,
            "distribution": distribution,
            "reviewText": "Excellent product, highly recommended for daily use!",
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Use environment port for deployment
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)