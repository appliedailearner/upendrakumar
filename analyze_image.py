from PIL import Image
import os

IMG_PATH = r"c:\My personal projects\Azure API Management\website\assets\images\certifications\Aviatrix ACE.webp"

def analyze_transparency():
    try:
        with Image.open(IMG_PATH) as img:
            img = img.convert("RGBA")
            width, height = img.size
            total_pixels = width * height
            transparent_pixels = 0
            
            # Sample every 5th pixel for speed
            for x in range(0, width, 5):
                for y in range(0, height, 5):
                    r, g, b, a = img.getpixel((x, y))
                    if a < 10: # Almost fully transparent
                        transparent_pixels += 1
            
            sampled_total = (width // 5) * (height // 5)
            ratio = transparent_pixels / sampled_total
            
            print(f"Image Size: {width}x{height}")
            print(f"Transparency Ratio: {ratio:.2%}")
            
            if ratio < 0.1:
                print("Conclusion: Image is mostly OPAQUE (Has a background)")
            else:
                print("Conclusion: Image has significant transparency")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    analyze_transparency()
