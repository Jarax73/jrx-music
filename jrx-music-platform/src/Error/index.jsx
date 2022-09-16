import ErrorImage from '../assets/error.png';

export default function Error() {
    return (
        <div style={{ margin: 'auto' }}>
            <img
                style={{
                    margin: 'auto',
                    height: '120%',
                }}
                src={ErrorImage}
                alt="Error"
            />
        </div>
    );
}
