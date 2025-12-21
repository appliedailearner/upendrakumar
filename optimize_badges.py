from PIL import Image
import os
import glob

# Configuration
SOURCE_DIR = r"c:\My personal projects\Azure API Management\website\assets\images\certifications"
TARGET_SIZE = (128, 128) # 2x for 64px display (Retina)

def optimize_images():
    print(f"Optimizing images in {SOURCE_DIR}...")
    
    # Get all PNG files
    files = glob.glob(os.path.join(SOURCE_DIR, "*.png"))
    
    if not files:
        print("No PNG files found!")
        return

    count = 0
    saved_space = 0
    
    for file_path in files:
        try:
            # Open image
            with Image.open(file_path) as img:
                # Convert to RGBA if not already (for transparency)
                if img.mode != 'RGBA':
                    img = img.convert('RGBA')
                
                # Get original size
                original_size = os.path.getsize(file_path)
                
                # Resize (Thumbnail preserves aspect ratio)
                img.thumbnail(TARGET_SIZE, Image.Resampling.LANCZOS)
                
                # Create new filename
                base_name = os.path.splitext(os.path.basename(file_path))[0]
                new_path = os.path.join(SOURCE_DIR, f"{base_name}.webp")
                
                # Save as WebP
                img.save(new_path, "WEBP", quality=85, method=6)
                
                # Calculate stats
                new_size = os.path.getsize(new_path)
                saved = original_size - new_size
                saved_space += saved
                count += 1
                
                print(f"Processed: {base_name}.png -> .webp ({original_size/1024:.1f}KB -> {new_size/1024:.1f}KB)")
                
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

    print(f"\nDone! Optimized {count} images.")
    print(f"Total space saved: {saved_space/1024/1024:.2f} MB")

if __name__ == "__main__":
    optimize_images()
