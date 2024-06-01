package main

import (
	"petrolistan.com/opet"
)


func opetToData(opetResponse opet.OpetDto) []DataModel{

	var list []DataModel
	for _,v := range opetResponse {		
		for _, z := range v.Prices {
			list = append(list, DataModel{
				BrandName: "Opet",
				BrandCode: "OPT", 
				ProvinceName: v.ProvinceName, 
				ProvinceCode: string(v.ProvinceCode),
				DistrictName: v.DistrictName,
				DistrictCode: v.DistrictCode,
				ProductName: z.ProductName,
				Amount: uint(z.Amount)})
		}
	}
	return list
}