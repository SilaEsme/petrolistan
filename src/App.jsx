import Turkey from "./components/map/turkey";
import { useWindowDimensions } from "./functions/windowHelper";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState();
  // eslint-disable-next-line no-unused-vars
  const { _, width } = useWindowDimensions();

  const fetchData = async () => {
    fetch("https://petrolistan.com/api/").then((res) => {
      res.json().then((result) => {
        setData(result.data);
      });
    });
  };

  const onProvinceSelect = (stateCode) => {
    let selected = data.find(x => x.province_code === stateCode.key);
    setSelectedData(selected)
    setShowModal(true);
  };

  useEffect(() => {
    fetchData()}, 
    []);

  const Modal = () => {
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-200  text-black outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-300 rounded-t">
                <h3 className="text-3xl font-semibold">{selectedData.province_name.charAt(0).toUpperCase() + selectedData.province_name.slice(1).toLowerCase()}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-1">
                {
                  selectedData.brands.map((brand) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="flex flex-col p-3 pt-0 border rounded-lg ">
                    <h2 className="my-4 bg-slate-200  font-semibold text-xl leading-relaxed">
                      {brand.brand_name}
                    </h2> 
                    {
                      brand.products.map((product) =>(
                        // eslint-disable-next-line react/jsx-key
                        <div className="flex flex-col justify-between">
                          <p>{product.product_name}: {product.amount}₺</p>
                        </div>
                      ))
                    }
                    </div>
                  ))  
                }
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-400 rounded-b">
                <button
                  className="text-red-500 border border-red-500 rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col h-screen items-center bg-slate-700 font-mono">
        <div className="flex flex-row w-full justify-center text-4xl p-3 bg-slate-600">
          <h1>Petrolistan</h1>
        </div>
        <div className="flex flex-row">
          <Turkey
            hoverColor={"#4f46e5"}
            hintBackgroundColor={"#4f46e5"}
            hintTextColor={"#FFF"}
            onSelect={onProvinceSelect}
            size={width / 1.3}
            hints={true}
            type="select-single"
          ></Turkey>
        </div>
        {showModal && <Modal></Modal>}
      </div>
    </>
  );
}

export default App;
