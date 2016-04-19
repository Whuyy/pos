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
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: '15.00'
    },
    {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: '2.00'
    },
    {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: '4.50'
    }
];
var inputs = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
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
    var temp_array = [];
    var save = [];
    for (var x = 0; x < ShopItems.length; x++)
    {
        count[temp] = 0;
        CartItems.CartItem[temp] = ShopItems[x];
        for(var y = 0; y < inputs.length; y++)
        {
            if(ShopItems[x].barcode === inputs[y])
                count[temp] ++;
            temp_array = inputs[y].split("-")
            if( ShopItems[x].barcode === temp_array[0] && temp_array.length > 1)
                count[temp]+= Number(temp_array[1]);
        }
        temp ++;
    }
    CartItems.count = count;
    for (var z = 0; z < CartItems.count.length;z++)
    {
        var discount = Math.floor(CartItems.count[z] / 3);
        save[z] = discount * CartItems.CartItem[z].price;
    }
    CartItems.save = save;
    return CartItems;
}

function buildItems(CartItems){
    var Items = {};
    var subtotal = [];
    for(var x = 0; x < CartItems.count.length; x++) {
        subtotal[x] = (CartItems.CartItem[x].price * CartItems.count[x]);
        subtotal[x] -= CartItems.save[x];
    }
    Items.CartItems = CartItems.CartItem;
    Items.count = CartItems.count;
    Items.subtotal = subtotal;
    Items.save = CartItems.save;
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
    ReceiptItems.save = Items.save;
    ReceiptItems.total = total;
    return ReceiptItems;
}

function getReceipt(ReceiptItems){
    var Receipt = '';
    var all_save = getAll_save(ReceiptItems.save);
    for (var x = 0; x < ReceiptItems.count.length; x++) {
        if(ReceiptItems.count[x] != 0) {
            Receipt += '名称：' + ReceiptItems.Items[x].name +
                '，数量：' + ReceiptItems.count[x] +
                ReceiptItems.Items[x].unit +
                '，单价：' + ReceiptItems.Items[x].price +
                '(元)，小计：' + ReceiptItems.subtotal[x].toFixed(2) + '(元)\n';
        }
    }
    Receipt = '***<没钱赚商店>收据***\n' + Receipt + '----------------------\n' +
        '总计：' + ReceiptItems.total.toFixed(2)+ '(元)\n' + '节省：'+ all_save.toFixed(2) +
        '(元)\n'+ '**********************'
    return Receipt;
}

function getAll_save(save) {
    var all_save = 0;
    for(var x = 0; x < save.length; x++)
        all_save += save[x];
    return all_save;
}
