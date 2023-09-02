let getClientInfo = () => {
    fetch ('./data/client.json')
        .then(res => res.json())
        .then(data => parseProducts(data.products));
}

