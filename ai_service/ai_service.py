from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer, pipeline

app = Flask(__name__)

# Load GPT-2 model and tokenizer
model_name = "gpt2"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

# Text generation pipeline
generator = pipeline('text-generation', model=model, tokenizer=tokenizer)

@app.route('/generate', methods=['POST'])
def generate_text():
    data = request.json
    prompt = data.get('prompt', '')
    generated_text = generator(prompt, max_length=100, num_return_sequences=1)[0]['generated_text']
    return jsonify({'generated_text': generated_text})

if __name__ == '__main__':
    app.run(debug=True)
