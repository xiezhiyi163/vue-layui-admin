var treesearch = function (treeId, filter, callback,$) {
    let treeElem = $('#' + treeId), filterElem = $(filter);
    if (!filterElem.length || !filterElem.length) {
        return;
    }
    // 搜索框的监听事件按实际需求来
    // filterElem.unbind('change').change(function () {
        // let that = this; //this;
        let that = filterElem; //this;
        let value = $(that).val().trim();
        let HIDE = 'layui-hide';
        let hintClass = 'search_hit';
        // 先恢复现场
        treeElem.find('.' + HIDE).removeClass(HIDE);
        treeElem.find('.' + hintClass).removeClass(hintClass)
        // 如果有值筛选开始
        if (value) {
            $.each(treeElem.find('.layui-tree-txt'), function (index, elem) {
                elem = $(elem);
                let textTemp = elem.text();
                if (textTemp.indexOf(value) === -1) {
                    // 不存在就隐藏
                    elem.closest('.layui-tree-set').addClass(HIDE)
                } else {
                    // 命中就添加一个class
                    elem.addClass(hintClass)
                }
            });
            $.each(treeElem.find('.' + hintClass), function (index, elem) {
                elem = $(elem);
                // 取消隐藏所有父节点
                elem.parents('.layui-tree-set').removeClass(HIDE);
                // 展开所有父节点
                elem.parents('.layui-tree-set').each(function (i, item) {
                    if (!$(item).hasClass('layui-tree-spread')) {
                        $(item).find('.layui-tree-iconClick :first').click();
                    }
                });
            });
        }
        typeof callback === 'function' && callback.call(that, treeElem, filterElem, treeElem.find('.' + hintClass).length);
    // });
};