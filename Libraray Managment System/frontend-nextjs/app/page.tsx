import Home from '@/components/home/Home'
const SetHeader = async () => {
    try {
        const token = ""; // Hole den Token, z.B. aus Umgebungsvariablen oder Cookies

        return (
            <main>
                <Home/>
            </main>

        );
    } catch (error) {
        console.error('Error fetching profile:', error);
        return (
            <main>
                <div>Error loading profile.</div>
            </main>
        );
    }
}
export default SetHeader;