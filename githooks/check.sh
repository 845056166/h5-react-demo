#!/bin/bash
set -e
administrator='xiongshiji@qq.com'
# 获取git账号
user=`git config --get user.email`
# 调用git获取暂存区vue,js,html,json文件
changeFiles=$(git diff --cached --name-only -- '*.vue' '*.tsx' '*.js' '*.html' '*.json' '*.sh')
arr=() #存放敏感文件的数组
# 提取提交的敏感文件(不是src开头的文件，或者是src/index.html文件 )
for file in $changeFiles
do
#   result=$(echo $file | grep "src/")
  if [[ !($file =~ 'src/') || $file = 'src/index.html' || $file =~ 'src/components' ]]
  # if [[ "$result" = "" ]]
  then
    arr[${#arr[@]}]=$file
  fi
done
# 提示不合法文件
# echo -e ${arr[@]\n}
length=${#arr[@]}
if [ $length -ne 0 ]
then
    echo -e "\033[31m存在如下敏感文件请注意： \033[0m"
    for ((i=0; i< $length; i++))
    do
      echo -e "\033[32m  ${arr[$i]}\033[0m"
    done
    # Git hooks do not use standard input. Thus, one must attach the input from the terminal: dev/tty
    # See: https://stackoverflow.com/questions/45495061/how-to-ask-for-user-input-in-a-git-hook
    echo -e '\n'
    read -s -p "敏感文件提交验证,请输入您的邮箱": confirmName </dev/tty
    if test $confirmName = $administrator
      then
        echo -e '\n \033[31m敏感文件已提交！\033[0m\n'
        exit 0
      else
        echo -e "\n\033[35m您的身份不对，请将敏感文件移除暂存区再提交 \033[0m \n"
        echo -e "\033[35m移除可以执行： git reset HEAD -- yourfile \033[0m\n"
        exit 1
    fi
    exit 1
fi
# chmod +x ./test.sh  #使脚本具有执行权限