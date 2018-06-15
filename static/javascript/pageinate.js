/**
 * Created by Jian on 2015/6/10.
 */

function PagerView(id,targetid) {
    var self = this;
    this.id = id;
    this.targetid = targetid;
    this.container = null;
    this.index = 1; // 当前页码, 从1开始
    this.size = 20; // 每页显示记录数
    this.maxButtons = 5; // 显示的分页按钮数量
    this.itemCount = 0; // 记录总数
    this.pageCount = 0; // 总页数
    this.targetHttp = document.getElementById(targetid).innerHTML; //得到原始标签组
    this.datas = [];//得到原始数据组
    this.rows = [];//得到原始行数据
    /**
     * 控件使用者重写本方法, 获取翻页事件, 可用来向服务器端发起AJAX请求.
     * @param index: 被点击的页码.
     * @param size: 显示数量
     */
    this.onclick = function (index,size) {
    };
    /**
     * 控件使用者重写本方法, 获取翻页事件, 可用来向服务器端发起AJAX请求.
     * @param datas: 传给后台的数据
     */
    this.loaddata = function(datas)
    {
        self.datas = datas;
        if(targetid) {
            if(datas instanceof Array)
            {
                datas = datas[0]
            }
            var rows;
            try{
                if(datas["rows"])
                {
                    rows = datas["rows"];
                }
                else
                {
                    rows = [];
                }
                if(datas["total"])
                {
                    self.itemCount = datas["total"];
                }
                else{
                    self.itemCount = datas["rows"].length;
                }
            }
            catch(exception){
                self.itemCount = 0;
                rows = [];
            }
            finally{
                self.rows = rows;
                var len = rows.length>self.size?self.size:rows.length;
                self._rowssplit(rows,len);
            }
        }
    };
    /**
     * 内部方法.
     * @param rows: 具体数据值
     * @param size: 具体数据值
     */
    this._rowssplit = function(rows,size){
        var str = "";
        if(self.index <= 0)
        {
            self.index = 1;
        }
        for(var j=0;j<size;j++) {
            var row = rows[j];
            var temp = String(self.targetHttp);
            for(var r in row){
                if(temp.indexOf("@@rowsnumber")>=0)
                {
                    temp = temp.replace("@@rowsnumber@@",j+1);
                }
                temp = temp.replace(new RegExp("@"+r, 'g'),row[r])
            }
            str+=temp;
        }
        document.getElementById(self.targetid).innerHTML = str;
    };
    /**
     * 内部方法.
     */
    this._onclick = function (index,size) {
        self.index = index;
        self.onclick(index,size);
        // self._rowssplit(self.rows,size);
        // self.render();
    };

    /**
     * 在显示之前计算各种页码变量的值.
     */
    this.calculate = function () {
        self.pageCount = parseInt(Math.ceil(self.itemCount / self.size));
        self.index = parseInt(self.index);
        if (self.index > self.pageCount) {
            self.index = self.pageCount;
        }
        else if(self.index <= 0)
        {
            self.index = 1;
        }
    };
    /**
     * 渲染分页控件.
     */
    this.render = function () {
        /**页面初始化**/
        if (self.id != undefined) {
            var div = document.getElementById(self.id);
            div.view = self;
            self.container = div;
        }
        self.calculate();
        var start, end;
        start = Math.max(1, self.index - parseInt(self.maxButtons / 2));
        end = Math.min(self.pageCount, start + self.maxButtons - 1);
        start = Math.max(1, end - self.maxButtons + 1);
        var str = '<ul class="pagination">';
        if (self.pageCount > 1) {
            if (self.index != 1) {
                str += '<li><a href="javascript://' + (self.index - 1) + '" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
            } else {
                str += '<li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
            }
        }
        for (var i = start; i <= end; i++) {
            if (i == this.index) {
                str += '<li class="active"><a href="#">'+i+'</a></li>';
            } else if ((i <= this.index+2 || i >= this.index-2) ){
                str += '<li><a href="javascript://' + i + '">'+i+'</a></li>';
            }
        }
        if (self.pageCount > 1) {
            if (self.index != self.pageCount) {
                str += '<li><a href="javascript://' + (self.index + 1) + '" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
            } else {
                str += '<li class="disabled"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
            }
        }
        str +='<li class="form-inline" style="padding-left: 20px;"><div class="form-group"><label for="btnGo">跳转到</label>' +
            '<input type="text" class="form-control" id="btnGo" style="width: 45px;margin: 0 5px;"><button type="button" class="btn btn-default btn-sm" style="margin: 2px 2px">GO</button>' +
            '<label>共 '+self.pageCount+' 页, ' + self.itemCount + '条记录</label></div></li>';
        str += '</ul>';
        self.container.innerHTML = str;
        var li_list = self.container.getElementsByTagName('li');
        for (var i = 0; i < li_list.length; i++) {
            li_list[i].onclick = function () {
                var index = this.firstElementChild.getAttribute("href");
                if (index != undefined && index != '') {
                    index = parseInt(index.replace('javascript://', ''));
                    if(index<self.pageCount) {
                        self._onclick(index, self.size);
                    }
                    else if(index==self.pageCount){
                        self._onclick(index, Number(self.itemCount)%Number(self.size));
                    }
                }
                return false;
            };
        }
        var btnGo = self.container.getElementsByTagName('button');
        var inputGo = self.container.getElementsByTagName('input');
        btnGo[0].onclick = function(){
            if(inputGo[0].value<self.pageCount)
            {
                self._onclick(inputGo[0].value,self.size);
            }
            //else if(inputGo[0].value==self.pageCount)
            //{
            //    self._onclick(self.pageCount, Number(self.itemCount)%Number(self.size));
            //}
            else
            {
                self._onclick(self.pageCount, Number(self.itemCount)%Number(self.size));
            }
        };
        window.scrollTo(0,document.getElementById(targetid).offsetTop);
    };
}