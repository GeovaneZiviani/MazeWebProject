
var selectName1 =  $('td[name="nickName"]')
var selectName2=  $('td[name="nickName"]')
function sortNum(selectName1, selectName2) {
    return 1 * $(selectName1).find('.sort').text() < 1 * $(selectName2).find('.sort').text() ? 1 : 0;
    
}
function sortTheTable(){
    $(function() {
        var elems = $.makeArray($('tr:has(.sort)').remove())
        
        elems.sort(sortNum)
        $('table#grid').append($(elems));
    });

}
 sortTheTable();