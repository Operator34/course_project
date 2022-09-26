function paginate (items,pageNumber,pageSize) {

    const startIndex = (pageNumber-1)*pageSize
    console.log('startIndex', startIndex);
    return[...items].splice(startIndex,pageSize)   
}

export default paginate