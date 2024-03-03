export default async function getResources() {
    try {
        const response = await fetch("http://localhost:3000/offers")
        return await response.json()
    } catch (e) {
        console.log("Error => ", e)
    } finally {
        console.log("Finally getResources()")
    }
}