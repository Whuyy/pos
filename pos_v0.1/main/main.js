var inputs = [
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: '3.00'

    },
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: '3.00'
    },
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: '3.00'
    },
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: '3.00'
    },
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

function printReceipt(inputs) {
    var Items = buildItems(inputs);
    var CartItems = buildCartItems(Items);
    var ReceiptItems = buildReceipt(CartItems);
    var Receipt = getReceipt(ReceiptItems);
    console.log(Receipt);
}

function buildItems(inputs)
{
    var Items = {};
    Items.Item = {};
    var Temp = 0;
    var count = [];
    count[0] = 1;
    for(var x = 0; x < inputs.length - 1; x++)
    {
        if( inputs[x].barcode === inputs[x+1].barcode)
            count[Temp]++;
        else
        {
            Items.Item[Temp] = inputs[x];
            Temp++;
            count[Temp] = 1;
        }
    }
    if (inputs[inputs.length - 1].barcode != inputs[inputs.length - 2].barcode)
    {
        count[Temp] = 1;
        Items.Item[Temp] = inputs [inputs.length - 1]
    }
    Items.count = count;
    return Items;
}

function buildCartItems(Items) {
    var CartItems = {};
    var subtotal = [];
    for ( var x = 0; x < Items.count.length; x++)
        subtotal[x] = Items.Item[x].price * Items.count[x];
    CartItems.subtotal = subtotal;
    CartItems.Items = Items.Item;
    CartItems.count = Items.count;
    return CartItems;
}

function buildReceipt( CartItems ) {
    var ReceiptItems = {};
    var total = 0;
    for ( var x = 0; x < CartItems.subtotal.length; x++)
        total += CartItems.subtotal[x] ;
    ReceiptItems.total = total;
    ReceiptItems.CartItems = CartItems.Items;
    ReceiptItems.subtotal = CartItems.subtotal;
    ReceiptItems.count = CartItems.count;
    return ReceiptItems;
}

function getReceipt(ReceiptItems)
{
    var Receipt = '';
    for (var x = 0; x < ReceiptItems.count.length; x++) {
        Receipt += '名称：' + ReceiptItems.CartItems[x].name +
            '，数量：' + ReceiptItems.count[x] +
            ReceiptItems.CartItems[x].unit +
            '，单价：' + ReceiptItems.CartItems[x].price.toFixed(2) +
            '(元)，小计：' + ReceiptItems.subtotal[x].toFixed(2) + '(元)\n';
    }
    Receipt = '***<没钱赚商店>收据***\n' + Receipt + '----------------------\n' +
        '总计：' + ReceiptItems.total.toFixed(2)+ '(元)\n' + '**********************'
    return Receipt;
}

