/*
 * JsonPowerDB Commons Library
 * Helper functions for JsonPowerDB API calls
 */

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";

function createGET_BY_KEY(dbName, relName, myKey, myValue) {
    return JSON.stringify({
        token: localStorage.getItem("token"),
        cmd: "GET_BY_KEY",
        dbName: dbName,
        rel: relName,
        jsonStr: {
            [myKey]: myValue
        }
    });
}

function createPUT(jsonObj, dbName, relName) {
    return JSON.stringify({
        token: localStorage.getItem("token"),
        cmd: "PUT",
        dbName: dbName,
        rel: relName,
        jsonStr: jsonObj
    });
}

function createUPDATE(jsonObj, dbName, relName, recNo) {
    return JSON.stringify({
        token: localStorage.getItem("token"),
        cmd: "UPDATE",
        dbName: dbName,
        rel: relName,
        record: recNo,
        jsonStr: jsonObj
    });
}

function executeCommandAtGivenBaseUrl(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.ajaxSetup({ async: false });
    var resultObj = $.ajax({
        url: url,
        type: "POST",
        data: reqString,
        contentType: "application/json",
        dataType: "json"
    });
    $.ajaxSetup({ async: true });
    return resultObj;
}