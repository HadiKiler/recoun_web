import subprocess
from pathlib import Path
import os
from selenium import webdriver
import os
import time
from selenium import webdriver

            

def go_witness(url, path, type = 'png'):
    """insert just path object \n
        type: png or pdf """
    
    Path(path).mkdir(parents=True, exist_ok=True)
    image_path = os.path.join(path, f'{url}.png')
    # Create a new instance of the Firefox driver
    try:
        options = webdriver.ChromeOptions()
        options.add_argument('headless')

        driver = webdriver.Chrome(options=options)

        # Go to the Google website
        try:
            driver.get(f'https://{url}')
        except:
            driver.get(f'http://{url}')
            
        time.sleep(1)
        # Take a screenshot of the webpage
        driver.save_screenshot(image_path)

        # Close the driver
        driver.quit()
        return f'static/images/{url}.png' 
    except:
        return ""

    


















