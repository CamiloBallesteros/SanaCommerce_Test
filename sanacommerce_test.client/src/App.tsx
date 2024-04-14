import { useEffect, useState } from 'react';
import './App.css';

interface Category {
    id: number,
    name: string
}

function App() {
    const [categories, setCategories] = useState<Category[]>();

    useEffect(() => {
        populateWeatherData();
    }, []);

    //const contents = categories === undefined
    //    ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
    //    : <table className="table table-striped" aria-labelledby="tabelLabel">
    //        <thead>
    //            <tr>
    //                <th>Id</th>
    //                <th>Name</th>
    //            </tr>
    //        </thead>
    //        <tbody>
    //            {categories.map(category =>
    //                <tr key={category.id}>
    //                    <td>{category.id}</td>
    //                    <td>{category.name}</td>
    //                </tr>
    //            )}
    //        </tbody>
    //    </table>;

    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data.</p>
        </div>
    );

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setCategories(data);
    }
}

export default App;