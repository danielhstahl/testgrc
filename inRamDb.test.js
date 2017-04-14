const inRamDb=require('./inRamDb')
it('adds to session', ()=>{
    const id=inRamDb.addToSession("somehashedpassword")
    expect(getFromSession(id)).toEqual("somehashedpassword")
})
it('removes from session', ()=>{
    const time=1000; //1 second
    const id=inRamDb.addToSession("anotherhashedpassword", time)
    setTimeout(()=>{
        expect(getFromSession(id)).toBeNull()
    }, time*2)
})