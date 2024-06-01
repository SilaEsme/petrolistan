package main

import (
	"net/http"

	"github.com/gorilla/mux"
	"petrolistan.com/opet"
)

func main() {
	r := mux.NewRouter();
	r.HandleFunc("/", loadHandler()).Methods("GET")//.BuildOnly().Host("petrolistan.com");

	http.ListenAndServe(":80", r);
}

func loadHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		
		var response []DataModel;
		// Get Opet Api
		opetResponse := opet.LoadOpetHandler(w);
		response = append(response, opetToData(opetResponse)...)
		// Get PO Api
		// Get Shell Api
	}
}

type DataModel struct{
	BrandName string
	BrandCode string
	ProductName string
	Amount uint
	ProvinceName string
	ProvinceCode string
	DistrictName string
	DistrictCode string
}