function countTotal(price,quantity){
    return price*quantity;
}

function rupiahString(number){
    reverse = number.toString().split('').reverse();
    arr= [];
    for(var i = 0; i<reverse.length;i++){
        if((i+1) % 3 === 0 && (i+1) !== reverse.length){
            arr.push(reverse[i]);
            arr.push('.');
        }else{
            arr.push(reverse[i]);
        }
    }

    return 'Rp. '+arr.reverse().join('');
}

module.exports = {
    countTotal: countTotal,
    rupiahString: rupiahString
}
