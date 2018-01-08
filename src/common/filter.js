import moment from 'moment';
export default {
    //时间 2017-10-16 11:11
    format: function (value,layout) {  //转换 2017/10/16 格式
      if (!value) return '';
      if (value=='--') return '--';  
      return moment(value).format(layout);
    },
    lineTime: function (value,month) {  //转换 2017/10/16-2017/10/17 格式
      if (!value) return '';
      let star =  moment(value).format('YYYY/MM/DD');
      let end =  moment(value).add(+(month),'months').format('YYYY/MM/DD');
      return star + '-' + end;
    },
}