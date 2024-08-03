import { useEffect } from 'react';
function Stub() {
    useEffect(() => {
        // eslint-disable-next-line no-undef
        const background = $('#back-img');
        background.css('backgroundImage', `url(../../titles/stub.jpg)`);
    })
    return (
        <>
            <h1 className='h1'>Greetings, my Padawan!</h1>
            <span className='block waiting-text'>Choose a movie and we will learn something new together</span>
            <div className="flex arrow-wrapper"><img className="arrow" src="./arrow.png" alt="arrow" /></div>
        </>
    );
}
export default Stub;