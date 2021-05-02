import sys
import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import time
import calendar
import datetime
import subprocess
import multiprocessing
from multiprocessing.pool import ThreadPool
import traceback


def create_driver():
    chromeOptions = webdriver.ChromeOptions()
    chromeOptions.add_argument("--headless")
    driver = webdriver.Chrome(
        ChromeDriverManager().install(), options=chromeOptions)
    return driver


def login_kaggle(driver):
    driver.get("https://www.kaggle.com")
    time.sleep(3)
    signin = "/html/body/main/div[1]/div/div[1]/div[2]/div[2]/div[1]/a/button"
    driver.find_element_by_xpath(signin).click()
    time.sleep(3)
    emailsignin = "/html/body/main/div[1]/div[1]/div/form/div[2]/div/div[2]/a/li/div"
    driver.find_element_by_xpath(emailsignin).click()
    time.sleep(3)
    username = "/html/body/main/div/div[1]/div/form/div/div[1]/div/div/input"
    driver.find_element_by_xpath(username).send_keys("saikrishnanama")
    time.sleep(1)
    password = '/html/body/main/div/div[1]/div/form/div/div[2]/div/div/input'
    driver.find_element_by_xpath(password).send_keys("nama@007")
    time.sleep(1)
    submit = "/html/body/main/div[1]/div[1]/div/form/div[2]/div[3]/button"
    driver.find_element_by_xpath(submit).click()
    time.sleep(1)

def kernel_names(driver):
    driver.get("https://www.kaggle.com/saikrishnanama/code")
    codepath = "/html/body/main/div[1]/div/div[5]/div[3]/div/div[3]/div/div[2]/div/div[1]/div/div[4]/div[2]/ul/li[{}]/div[1]/a/div/div"
    filenames = set()
    i = 1
    while True:
        try:
            curr = codepath.format(i)
            filenames.add(driver.find_element_by_xpath(curr).text)
            i = i + 1
        except:
            break
    filenames = list(filenames)
    return filenames


def run_notebook(driver, name):
    notebookpathformat = "https://www.kaggle.com/saikrishnanama/{}/edit"
    notebookpath = notebookpathformat.format(name)
    driver.get(notebookpath)
    time.sleep(3)

    try:
        continueedit = "/html/body/div[1]/div/div/div[5]/div[2]/div[4]/div[1]/div/div[2]/button[2]/"
        driver.find_element_by_xpath(continueedit).click()
        time.sleep(1)
    except:
        pass

    saveversion = "/html/body/div[1]/div/div/div[5]/div[2]/div[1]/div[2]/div[4]/button"
    driver.find_element_by_xpath(saveversion).click()
    time.sleep(2)

    advancedsettings = "/html/body/div[1]/div/div/div[5]/div[2]/div[4]/div[1]/div/div[2]/div/button"
    driver.find_element_by_xpath(advancedsettings).click()
    time.sleep(1)
    
    saveoutput = "/html/body/div[1]/div/div/div[5]/div[2]/div[4]/div[1]/div/div[1]/div[1]/div[2]/label/div"
    driver.find_element_by_xpath(saveoutput).click()
    time.sleep(1)
    
    saveadv = "/html/body/div[1]/div/div/div[5]/div[2]/div[4]/div[1]/div/div[2]/button[2]"
    driver.find_element_by_xpath(saveadv).click()
    time.sleep(1)
    
    savever = "/html/body/div[1]/div/div/div[5]/div[2]/div[4]/div[1]/div/div[2]/button[1]"
    driver.find_element_by_xpath(savever).click()
    time.sleep(3)


if __name__ == "__main__":
    try:
        driver = create_driver()
        login_kaggle(driver)
        time.sleep(3)
        run_notebook(driver, "feature-creation-1")
        time.sleep(2)
        run_notebook(driver, "feature-creation-2")
        driver.quit()
    except:
        traceback.print_exc()
