import ErrorImage from '../assets/error.png';

export default function Error() {
    return (
        <div style={{ margin: 'auto' }}>
            <img
                style={{
                    margin: 'auto',
                    height: '100%',
                }}
                src={ErrorImage}
                alt="Error"
            />
        </div>
    );
}
