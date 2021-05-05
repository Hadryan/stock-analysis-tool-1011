import pandas as pd
import os
import subprocess

# subprocess.run(["git", "config","--global", "user.email", "saikrishna.nama@msitprogram.net"])
# subprocess.run(["git", "config","--global", "user.name", "saikr789"])
# subprocess.run(["git", "pull", "origin", "master"])


path = os.path.join(os.getcwd(), "Data","Stock")

# previousdaystockdetails = pd.DataFrame()
# for name in os.listdir(path):
#     try:
#         df = pd.read_csv(path+"/"+name)
#         df['company'] = name[:-4]
#         previousdaystockdetails = previousdaystockdetails.append(df.head(1))
#     except:
#         pass
previousdaystockdetails = pd.read_csv(os.path.join(path,"results.csv"))
previousdaystockdetails.to_csv(os.path.join(path,"previousdaystockdetails.csv"), index=None)

# subprocess.run(["git", "add", os.path.join(
#     path, "previousdaystockdetails.csv")])
# subprocess.run(["git", "commit", "-m", "previousdaystockdetails"])
# subprocess.run(["git", "pull", "origin", "master"])
# subprocess.run(["git", "push", "origin", "master"])
