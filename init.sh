#!/bin/sh
static=/opt/ccs/operation/

shellpath=/opt/ccs/diff
DATE=`date +%Y%m%d`
export LOG_FILE=$shellpath/logs/$DATE.init.log
recent=$shellpath/recent.txt

declare -A map=()
total=0
function batch_init() {
    echo "init "$1 >>$LOG_FILE
    for file in `find $1 -type f`
    do
        dosum $file
    done
}

function dosum() {
    key=$1
    value=`md5sum $1`
    value=${value:0:32}
	map[$key]=$value
    echo "生成校验码"$key"_______"$value >>$LOG_FILE
}

function show() {
    if [ -f "$recent" ];then
        mv -f $recent bak/bak.txt.$DATE
    fi
    for key in ${!map[@]}
    do
        echo $key","${map[$key]}>>$recent
        total=$(($total+1))
    done
    echo "初始化完成，共记录"$total"条记录" >>$LOG_FILE
}

batch_init $static
show
