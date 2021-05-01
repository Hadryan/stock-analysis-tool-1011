import datetime
import os
import multiprocessing
import subprocess
import pandas as pd
print(datetime.datetime.now())
print(os.getcwd())
print(os.listdir())
print(multiprocessing.cpu_count())
print(len(os.listdir("Data/Stock")))
for dirname, _, filenames in os.walk(os.getcwd()):
    for filename in filenames:
        print(os.path.join(dirname, filename))
    
