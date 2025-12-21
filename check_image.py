from PIL import Image
import os

IMG_PATH = r"c:\My personal projects\Azure API Management\website\assets\images\certifications\Aviatrix ACE.webp"

def check_transparency():
    try:
        with Image.open(IMG_PATH) as img:
            print(f"Image mode: {img.mode}")
            pixel = img.getpixel((0, 0))
            print(f"Top-left pixel: {pixel}")
            
            # Check center pixel too just in case
            w, h = img.size
            center = img.getpixel((w//2, h//2))
            print(f"Center pixel: {center}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_transparency()
