module.exports = async () => {
    // NOTE: This is a sample data source.
    // We could as well load data from a URL (this is why we are using an async function)
    return [
        {
            "title": "Some page",
            "content": "This is a page"
        },
        {
            "title": "Another page",
            "content": "This is another page"
        },
        {
            "title": "Yet another page",
            "content": "This is yet another page"
        }
    ]
}
