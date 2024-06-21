from transformers import GPT2LMHeadModel, GPT2Tokenizer
import time

model_name = "gpt2"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

def generate_response(prompt):
    inputs = tokenizer.encode(prompt, return_tensors="pt")
    outputs = model.generate(inputs, max_length=150, do_sample=True)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response

if __name__ == "__main__":
    print("Ema Project AI Service is running")
    while True:
        user_input = input("You: ")
        response = generate_response(user_input)
        print(f"Ema: {response}")
        time.sleep(1)
