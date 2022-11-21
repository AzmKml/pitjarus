import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const TableData = () => {
  const { brands, products } = useSelector((state) => state.products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div
          style={{
            width: "800px",
            alignSelf: "center",
            marginTop: "40px",
            marginBottom: "40px",
          }}
        >
          <h1>Brand Table Percentage</h1>
          <table id="customers">
            <thead>
              <tr>
                <th>Brand</th>
                {products.map((el, id) => {
                  return <th key={id}>{el.area_name}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {Object.keys(brands).map((el, id) => {
                return (
                  <tr key={id}>
                    <td>{el}</td>
                    {brands[el].map((ele, idx) => {
                      return (
                        <td key={idx}>
                          {Number(ele) ? Number(ele).toFixed(1) + "%" : ele}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
