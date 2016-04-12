var inputs = [
    {
        barcode:'ITEM000000',
        name:'可口可乐',
        unit:'瓶',
        price:'3.00',
        count:'5'
    },
    {
        barcode:'ITEM000001',
        name:'雪碧',
        unit:'瓶',
        price:'3.00',
        count:'2'
    },
    {
        barcode:'ITEM000004',
        name:'电池',
        unit:'个',
        price:'2.00',
        count:'1'
    }
];

function printReceipt(inputs) {
    var CartItems = buildCartItems(inputs);
    var ReceiptItems = buildReceipt(CartItems);
    var Receipt = getReceipt(ReceiptItems);
    console.log(Receipt);
}

function buildCartItems(Items) {
    var CartItems = {};
    var subtotal = [];
    for ( var x = 0; x < Items.length; x++)
    {
        subtotal[x] = Items[x].price * Items[x].count;
    }
    CartItems.Items = Items;
    CartItems.subtotal = subtotal;
    return CartItems;
}

function buildReceipt( CartItems ) {
    var ReceiptItems = {};
    var total = 0;
    for ( var x = 0; x < CartItems.subtotal.length; x++)
    {
        total += CartItems.subtotal[x] ;
    }
     ReceiptItems.total = total;
     ReceiptItems.CartItems = CartItems.Items;
     ReceiptItems.subtotal = CartItems.subtotal;
     return ReceiptItems;
}

function getReceipt(ReceiptItems)
{
    var Receipt = '';
    for (var x = 0; x < ReceiptItems.CartItems.length; x++) {
        Receipt += '名称：' + ReceiptItems.CartItems[x].name +
            '，数量：' + ReceiptItems.CartItems[x].count +
            ReceiptItems.CartItems[x].unit +
            '，单价：' + ReceiptItems.CartItems[x].price.toFixed(2) +
            '(元)，小计：' + ReceiptItems.subtotal[x].toFixed(2) + '(元)\n';
    }
    Receipt = '***<没钱赚商店>收据***\n' + Receipt + '----------------------\n' +
        '总计：' + ReceiptItems.total.toFixed(2)+ '(元)\n' + '**********************'
     return Receipt;
}
