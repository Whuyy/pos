var ShopItems = [
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: '3.00'

    },
    {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: '3.00'
    },
    {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: '2.00'
    }
];
var inputs = [
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000001',
    'ITEM000001',
    'ITEM000004'
];
function printReceipt(inputs) {
    var CartItems = getCartItems(inputs,ShopItems);
    var Items = buildItems(CartItems);
    var ReceiptItems = buildReceiptItems(Items);
    var Receipt = getReceipt(ReceiptItems);
    console.log(Receipt);
}

function getCartItems (inputs,ShopItems){
    var CartItems = {};
    CartItems.CartItem = {};
    var temp = 0;
    var count = [];
    for (var x = 0; x < ShopItems.length; x++)
    {
        count[temp] = 0;
        CartItems.CartItem[temp] = ShopItems[x];
        for(var y = 0; y < inputs.length; y++)
        {
            if(ShopItems[x].barcode === inputs[y])
                count[temp] ++;
        }
        temp ++;
    }
    CartItems.count = count;
    return CartItems;
}

function buildItems(CartItems){
    var Items = {};
    var subtotal = [];
    for(var x = 0; x < CartItems.count.length; x++)
        subtotal[x] = CartItems.CartItem[x].price * CartItems.count[x];
    Items.CartItems = CartItems.CartItem;
    Items.count = CartItems.count;
    Items.subtotal = subtotal;
    return Items;
}

function buildReceiptItems(Items){
    var ReceiptItems = {};
    var total = 0;
    for(var x = 0; x < Items.subtotal.length; x++)
    total += Items.subtotal[x];
    ReceiptItems.Items = Items.CartItems;
    ReceiptItems.count = Items.count;
    ReceiptItems.subtotal = Items.subtotal;
    ReceiptItems.total = total;
    return ReceiptItems;
}

function getReceipt(ReceiptItems){
    var Receipt = '';
    for (var x = 0; x < ReceiptItems.count.length; x++) {
        Receipt += '名称：' + ReceiptItems.Items[x].name +
            '，数量：' + ReceiptItems.count[x] +
            ReceiptItems.Items[x].unit +
            '，单价：' + ReceiptItems.Items[x].price +
            '(元)，小计：' + ReceiptItems.subtotal[x].toFixed(2) + '(元)\n';
    }
    Receipt = '***<没钱赚商店>收据***\n' + Receipt + '----------------------\n' +
        '总计：' + ReceiptItems.total.toFixed(2)+ '(元)\n' + '**********************'
    return Receipt;
}