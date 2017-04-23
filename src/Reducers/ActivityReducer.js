const activities=(state=[], action)=>{
    switch(action.type){
        case "SET_RAW_ACTIVITIES":
            return action.activities.map(val=>{
                const {timeline}=val;
                const orderedTimeline=timeline.sort((a, b)=>a.dueDate>b.dueDate)

                const notDoneYet=orderedTimeline.filter(val=>val.actualDate===null)
                const n=notDoneYet.length;
                return Object.assign({}, val, {nextDueDate:notDoneYet[0].dueDate, finalDueDate:notDoneYet[n-1].dueDate, timeline:orderedTimeline})
            }).sort((a, b)=>a.nextDueDate>b.nextDueDate)
        default:
            return state;
    }
}
export default activities;