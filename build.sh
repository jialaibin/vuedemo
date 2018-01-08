#! /bin/sh
# h5-b2c-fe build shell
# by lk
#npm config set color false
set -e

NODE=$(node -v)
NPM=$(npm -v)
echo  "node: ${NODE}"
echo  "npm: ${NPM}"
#查找node_modules文件是否有内容
#DIR=node_modules/cross-env
#if [ -d $DIR ]; then
#    echo 'project is ready'
#else
#    echo 'node_modules start builder'
#    ((npm install) 2>&1) >> log.txt     
#fi

# 部署时需把dist里的文件部署到线上
compileDist="dist"
APP_NAME="operation-fe"
PROJECT_NAME="operation-fe-h5"

# ((npm run pub) 2>&1) >> log.txt
BaseDir=`pwd`
rm -rf output
mkdir -p output/A
mkdir -p output/production
cd dist

ls -alFh
pwd
ls -alFh ..

cp -r ../banklogo banklogo
#cp -r ../diff diff

# 静态文件打包 
tar -cvf ccs_${APP_NAME}_static.tar * > /dev/null

ls | grep -v ccs_${APP_NAME}_static.tar | xargs rm -rf

mkdir -p operation/operation
mv -f ccs_${APP_NAME}_static.tar operation/operation/ccs_${APP_NAME}_static.tar
cp -r ../init.sh operation/operation/init.sh 
cp -r ../order.txt operation/operation/order.txt
tar -cvf operation.tar operation
cp operation.tar ${BaseDir}/output/A
cp operation.tar ${BaseDir}/output/production
rm -rf operation
rm -rf operation.tar

#/bin/rm -rf $APP_NAME

cd ..
echo '################################################'
echo -e "\033[32m\033[1m[ info ]\033[0m \033[31m\033[1m${PROJECT_NAME}\033[0m cdnpack build success!"
echo '################################################'

