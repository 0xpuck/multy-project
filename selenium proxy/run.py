import time
import itertools
import os
import time

from seleniumwire import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains

PROXY_LIST = [
    "194.126.219.144:50100",
    "194.126.219.64:50100",
    "194.126.219.62:50100",
    "194.126.219.61:50100",
    "194.126.219.148:50100", 
    "194.126.219.147:50100",
    "194.126.219.114:50100",
    "194.126.219.106:50100",
    "194.126.219.183:50100",
    "194.126.219.127:50100",
]

if "links.txt" not in os.listdir():
    with open("error.txt", "w") as file:
        file.write("links.txt not found")
    exit(1)

links = []
with open("links.txt", "r") as file:
    linkzz = file.readlines()
    for link in linkzz:
        links.append(link.strip())

proxy_username = "tabo020913"
proxy_password = "aRX47gFe8N"

while True:
    for link in links:
        proxy_url = itertools.cycle(PROXY_LIST)
        proxy = next(proxy_url)

        seleniumwire_options = {
            "proxy": {
                "http": f"http://{proxy_username}:{proxy_password}@{proxy}",
                "verify_ssl": False,
            },
        }

        driver = webdriver.Chrome(
            seleniumwire_options=seleniumwire_options,
        )
        driver.implicitly_wait(10)

        driver.get(link)
        actions = ActionChains(driver)
        
        print("=+++++++++++++++++++=========================success1=======================================++++++++++")
        try:
            driver.find_element(By.CSS_SELECTOR, ".fa-exchange").click()
            time.sleep(2)
            print("=+++++++++++++++++++=========================success11=======================================++++++++++")
        except:
            pass
            print("=+++++++++++++++++++=========================success22=======================================++++++++++")

        try:
            driver.find_elements(
                By.CSS_SELECTOR,
                ".card:nth-child(1) > .therapist-modal:nth-child(2) .trim_img",
            )[-1].click()
            time.sleep(2)
            driver.find_element(By.CSS_SELECTOR, "#therapist_modal .close").click()
            # driver.back()

            time.sleep(2)
            print("=+++++++++++++++++++=========================33=======================================++++++++++")
        except:
            pass
            print("=+++++++++++++++++++=========================44=======================================++++++++++")
        
        try:
            driver.find_elements(
                By.CSS_SELECTOR,
                ".card:nth-child(2) > .therapist-modal:nth-child(2) .trim_img",
            )[-1].click()
            time.sleep(2)
            driver.find_element(By.CSS_SELECTOR, "#therapist_modal .close").click()
            # driver.back()
            time.sleep(2)
            print("=+++++++++++++++++++=========================55=======================================++++++++++")
        except:
            pass
            print("=+++++++++++++++++++=========================66=======================================++++++++++")
        
        try:
            driver.find_elements(
                By.CSS_SELECTOR,
                ".card:nth-child(3) > .therapist-modal:nth-child(2) .trim_img",
            )[-1].click()
            time.sleep(2)
            driver.find_element(By.CSS_SELECTOR, "#therapist_modal .close").click()
            # driver.back()
            time.sleep(2)
            print("=+++++++++++++++++++=========================77=======================================++++++++++")
        except:
            pass
            print("=+++++++++++++++++++=========================88=======================================++++++++++")

        try:
            driver.find_elements(
                By.CSS_SELECTOR,
                ".card:nth-child(4) > .schedule-cc:nth-child(2) .trim_img",
            )[-1].click()
            time.sleep(2)
            driver.find_element(By.CSS_SELECTOR, "#therapist_modal .close").click()
            # driver.back()
            time.sleep(2)
            print("=+++++++++++++++++++=========================99=======================================++++++++++")
        except:
            pass
            print("=+++++++++++++++++++=========================111=======================================++++++++++")

        try:
            sch = driver.find_element(By.XPATH, '//*[@id="schedule-select-2"]')
            actions.move_to_element(sch).click().perform()
            print("=+++++++++++++++++++=========================222=======================================++++++++++")
        except:
            sch = driver.find_element(
                By.XPATH,
                "/html/body/div[1]/div[2]/div/div[2]/main/div[2]/div[2]/div[1]/div[3]/ul/li[2]",
            )
            actions.move_to_element(sch).click().perform()
            # pass
            print("=+++++++++++++++++++=========================333=======================================++++++++++")
        
        try:
            driver.find_elements(
                By.CSS_SELECTOR, "#girl-list-frame-2 .card:nth-child(1) .trim_img"
            )[-1].click()
            time.sleep(2)
            driver.find_element(By.CSS_SELECTOR, "#therapist_modal .close").click()
            # driver.back()
            time.sleep(2)
            print("=+++++++++++++++++++=========================444=======================================++++++++++")
        except:
            pass
            print("=+++++++++++++++++++=========================555=======================================++++++++++")

        try:
            driver.find_elements(
                By.CSS_SELECTOR, "#girl-list-frame-2 .card:nth-child(2) .trim_img"
            )[-1].click()
            time.sleep(2)
            driver.find_element(By.CSS_SELECTOR, "#therapist_modal .close").click()
            # driver.back()
            time.sleep(2)
            print("=+++++++++++++++++++=========================666=======================================++++++++++")
        except:
            pass
            print("=+++++++++++++++++++=========================777=======================================++++++++++")

        try:
            driver.find_elements(
                By.CSS_SELECTOR, "#girl-list-frame-2 .card:nth-child(3) .trim_img"
            )[-1].click()
            time.sleep(2)
            driver.find_element(By.CSS_SELECTOR, "#therapist_modal .close").click()
            # driver.back()
            time.sleep(2)

            print("=+++++++++++++++++++=========================888=======================================++++++++++")
        except:
            pass
            print("=+++++++++++++++++++=========================999=======================================++++++++++")

        try:
            driver.find_elements(
                By.CSS_SELECTOR, "#girl-list-frame-2 .card:nth-child(4) .trim_img"
            )[-1].click()
            time.sleep(2)
            driver.find_element(By.CSS_SELECTOR, "#therapist_modal .close").click()
            # driver.back()
            time.sleep(2)
            print("=+++++++++++++++++++=========================000=======================================++++++++++")
        except:
            pass
            print("=+++++++++++++++++++=========================1234=======================================++++++++++")

        try:
            time.sleep(3)
            driver.find_element(By.XPATH, "//span[contains(.,'料金システム')]").click()
            time.sleep(3)
            driver.find_element(By.XPATH, "//span[contains(.,'割引情報')]").click()
            time.sleep(3)
            driver.find_element(By.LINK_TEXT, "セラピスト").click()
            driver.find_elements(By.CSS_SELECTOR, ".trimbox > picture > .trim_img")[
                -1
            ].click()
            time.sleep(2)
            print("=+++++++++++++++++++=========================1111=======================================++++++++++")
        except:
            pass
            print("=+++++++++++++++++++=========================2222=======================================++++++++++")


        driver.quit()

        time.sleep(4)
