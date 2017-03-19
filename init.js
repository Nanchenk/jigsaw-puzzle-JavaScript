(function($globle) {
	// 1. 配置参数
	// 2. 生成正确顺序的数组
	// 3. 创建子元素
	// 4. 打乱数组
	// 5. 将子元素按照大乱数组的顺序，放入显示数组
	// 6. 处理交互
	// 7. 判断成功的条件
	var arr = {
			arr_sort: [],
			arr_random:[],
			arr_display: []
		};

	var Gamer = function() {
		this.config = {
			size: '4*4',
			url: 'pic.jpg'
		};
	};

    // 初始化排序数组，随机数组
	Gamer.prototype.init = function () {
		this.sortArray();
		this.createChild();
	};

	Gamer.prototype.sortArray = function () {
		var _w = this.config.size.split('*')[0],
			_h = this.config.size.split('*')[1];

        var temp = [];
		for(var i = 0; i < _w*_h; i++){
			temp.push(i+1);
		}

		arr.arr_sort = temp.slice(0);

		arr.arr_random = temp.sort(function () {
			return Math.random() - 0.5;
		});

		console.log(arr.arr_sort);
		console.log(arr.arr_random);

		var gamerBody = document.getElementById('gamerBody');
		var margin = (parseInt(_h,10) + 1) + "px";

		gamerBody.setAttribute("style", "margin:" + margin);
	};

	// 创建子元素
	Gamer.prototype.createChild = function () {
		var gamerBody = document.getElementById('gamerBody');
		var index = 0;
        var rows = this.config.size.split('*')[0];
        var cols = this.config.size.split('*')[1];
        var temp = [];
		for(var row = 1; row <= rows; row++) {
			var col = 1;
			for(; col <= cols; col++) {
				var subElement = document.createElement('div');
				  subElement.id = arr.arr_sort[index++];
				  subElement.style.width = (gamerBody.offsetWidth - 8)  / cols + 'px';
				  subElement.style.height = (gamerBody.offsetHeight - 8) / rows + 'px';
				  subElement.style.disPlay = "block";
				  subElement.style.float = "left";
				  subElement.style.background = "url('" + this.config.url + "') " + (-gamerBody.offsetWidth / cols * col) + "px " + (-gamerBody.offsetHeight / rows * row) + "px";
				  // subElement.style.margin = Math.floor(gamerBody.style.margin.replace(/[^0-9]/ig,"")-1 / this.config.size.split('*')[1]) + "px";
				  subElement.style.margin = "1px"

				  temp.push(subElement);
			};
		};

		arr.arr_random.forEach(function (item) {
			var index = temp.map(function (subItem) {
				return subItem.id - 0;
			}).indexOf(item);

			if(index !== -1) {
				arr.arr_display.push(temp[index]);
				gamerBody.appendChild(temp[index]);
			}
		});

		console.log(arr.arr_display);
	};

	$globle.gamer = new Gamer();
})(window)