/*
 * JsonPowerDB Commons Library
 * Helper functions for JsonPowerDB API calls
 */

const jpdbBaseURL = "http://api.login2explore.com:5577";
const jpdbIRL = "/api/irl";
const jpdbIML = "/api/iml";
const DB_NAME    = "SCHOOL-DB";
const REL_NAME   = "STUDENT-TABLE";
const PK_FIELD   = "Roll-No";
var   recNo      = "";   // stores record number for updates

const token = "90935185|-31949239818757777|90958779";

function createGET_BY_KEY(dbName, relName, myKey, myValue) {
    return JSON.stringify({
        token: token,
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
        token: token,
        cmd: "PUT",
        dbName: dbName,
        rel: relName,
        jsonStr: jsonObj
    });
}

function createUPDATE(jsonObj, dbName, relName, recNo) {
    return JSON.stringify({
        token: token,
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

    // ─── Save Token ───────────────────────────────────────────
    function saveToken() {
        
        localStorage.setItem("token", token);
        showToast("Token saved! You can now use the form.", "success");
        $("#rollNo").focus();
    }

    // ─── Reset / Initial State ────────────────────────────────
    function resetForm() {
        recNo = "";
        // Clear all fields
        ["rollNo","fullName","class","birthDate","address","enrollmentDate"]
            .forEach(id => { document.getElementById(id).value = ""; });

        // Disable all fields except rollNo
        ["fullName","class","birthDate","address","enrollmentDate"]
            .forEach(id => { document.getElementById(id).disabled = true; });
        document.getElementById("rollNo").disabled = false;

        // Disable all buttons
        ["btnSave","btnUpdate","btnReset"].forEach(id => {
            document.getElementById(id).disabled = true;
        });

        setStatus("Enter a Roll No to get started.", "default");
        $("#rollNo").focus();
    }

    // ─── Check Roll No ────────────────────────────────────────
    function checkRollNo() {
        var rollNo = $("#rollNo").val().trim();
        if (!rollNo) { showToast("Roll No cannot be empty.", "error"); return; }
        if (!token) {
            showToast("Please connect with your token first.", "error"); return;
        }
       

        var req = createGET_BY_KEY(DB_NAME, REL_NAME, PK_FIELD, rollNo);
         console.log(req);
        var result = executeCommandAtGivenBaseUrl(req, jpdbBaseURL, jpdbIRL);

        if (result.status === 200) {
            // Record EXISTS → fill form, enable Update + Reset
            var data = JSON.parse(result.responseText).data.rec;
            recNo = JSON.parse(result.responseText).data.rec_no;

            $("#fullName").val(data["Full-Name"]);
            $("#class").val(data["Class"]);
            $("#birthDate").val(data["Birth-Date"]);
            $("#address").val(data["Address"]);
            $("#enrollmentDate").val(data["Enrollment-Date"]);

            enableFields(true);
            $("#rollNo").prop("disabled", true);   // lock primary key
            $("#btnSave").prop("disabled", true);
            $("#btnUpdate").prop("disabled", false);
            $("#btnReset").prop("disabled", false);

            setStatus("Record found. You can update the details.", "edit");
            showToast("Record loaded for Roll No: " + rollNo, "info");
            $("#fullName").focus();

        } else if (result.status === 400) {
            // Record NOT found → allow Save
            enableFields(false);
            $("#btnSave").prop("disabled", false);
            $("#btnUpdate").prop("disabled", true);
            $("#btnReset").prop("disabled", false);

            setStatus("New record. Fill in the details and click Save.", "new");
            showToast("New entry. Fill in the details.", "success");
            $("#fullName").focus();
        } else {

            showToast(result.status +"Error connecting to JPDB. Check your token.", "error");
        }
    }

    // ─── Enable / Disable Fields ──────────────────────────────
    function enableFields(withValues) {
        ["fullName","class","birthDate","address","enrollmentDate"]
            .forEach(id => { document.getElementById(id).disabled = false; });
    }

    // ─── Validate ─────────────────────────────────────────────
    function validateForm() {
        var fields = {
            "Roll No":          $("#rollNo").val().trim(),
            "Full Name":        $("#fullName").val().trim(),
            "Class":            $("#class").val().trim(),
            "Birth Date":       $("#birthDate").val().trim(),
            "Address":          $("#address").val().trim(),
            "Enrollment Date":  $("#enrollmentDate").val().trim()
        };
        for (var key in fields) {
            if (!fields[key]) {
                showToast(key + " cannot be empty.", "error");
                return null;
            }
        }
        return {
            [PK_FIELD]:         fields["Roll No"],
            "Full-Name":        fields["Full Name"],
            "Class":            fields["Class"],
            "Birth-Date":       fields["Birth Date"],
            "Address":          fields["Address"],
            "Enrollment-Date":  fields["Enrollment Date"]
        };
    }

    // ─── Save ─────────────────────────────────────────────────
    function saveData() {
        var jsonObj = validateForm();
        if (!jsonObj) return;

        var req = createPUT(jsonObj, DB_NAME, REL_NAME);
        var result = executeCommandAtGivenBaseUrl(req, jpdbBaseURL, jpdbIML);

        if (result.status === 200) {
            showToast("✅ Record saved successfully!", "success");
            resetForm();
        } else {
            showToast("Failed to save. " + result.responseText, "error");
        }
    }

    // ─── Update ───────────────────────────────────────────────
    function updateData() {
        var jsonObj = validateForm();
        if (!jsonObj) return;
        delete jsonObj[PK_FIELD];   // don't update primary key

        var req = createUPDATE(jsonObj, DB_NAME, REL_NAME, recNo);
        var result = executeCommandAtGivenBaseUrl(req, jpdbBaseURL, jpdbIML);

        if (result.status === 200) {
            showToast("✅ Record updated successfully!", "success");
            resetForm();
        } else {
            showToast("Failed to update. " + result.responseText, "error");
        }
    }

    // ─── Status Bar ───────────────────────────────────────────
    function setStatus(msg, type) {
        $("#statusText").text(msg);
        var bar = $("#statusBar");
        bar.removeClass("status-new status-edit");
        if (type === "new")  bar.addClass("status-new");
        if (type === "edit") bar.addClass("status-edit");
    }

    // ─── Toast ────────────────────────────────────────────────
    function showToast(msg, type) {
        var t = document.getElementById("toast");
        t.textContent = msg;
        t.className = "show " + type;
        setTimeout(() => { t.className = ""; }, 3000);
    }