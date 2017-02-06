function CamposJson(ids){
// '#firstName, #lastName,#phoneNumber,#address'
var $items = $(ids)
var obj = {}
$items.each(function() {
    obj[this.id] = $(this).val();
})

return  JSON.stringify( obj);
}