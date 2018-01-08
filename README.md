# operation

> A Vue.js project

## Build Setup


``` bash
# install demo
    npm install vuedemo --save
   
    cd vuedemo
    
# install dependencies
npm install

# serve with hot reload at localhost:8080

npm run start

```
## 按环境分执行命令

- 开发：npm run start
- 联调：npm run dev
- 测试：npm run qa
- 线上：npm run pub

## 上线部署流程

- 执行 npm run pub  命令会产生dist文件夹
- 把dist里的文件放在服务器相对的目录下
- 访问app.html

## 主要事项

- build.sh文件中执行的npm命令一定要把log输出到文件.

```
//例如：
((npm run pub) 2>&1) >> log.txt

```


