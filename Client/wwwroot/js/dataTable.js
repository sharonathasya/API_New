// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
//Employee
//using DataTables
$(document).ready(function () {
    var table = $("#tableEmp").DataTable({
        'ajax': {
            'url': "/Employees/GetAll",
            "datatype": "json",
            'dataSrc': ''
        },
        buttons: [
            {
                extend: 'excelHtml5',
                name: 'excel',
                title: 'Employee',
                sheetName: 'Employee',
                text: '',
                className: 'btn fa fa-file-excel-o btn-success btn-sm',
                filename: 'Data',
                autoFilter: true,
                exportOptions: {
                    columns: [1, 2, 3, 4, 5]
                }
            }
        ],
        'columnDefs': [
            { orderable: false, targets: [2, 3, 5] }
        ],
        'columns': [
            {
                "data": null,
                "orderable": false,
                "render": function (data, type, full, meta) {
                    return meta.row + 1;
                }
            },
            {
                "data": "nik"
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    return `${row['firstName']} ${row['lastName']}`;
                }
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    if (row['phone'].search(0) == 0) {
                        return row['phone'].replace('0', '+62');
                    }
                    return `+62${row['phone']}`;
                }
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    return `Rp. ${row['salary']}`;
                }
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    if (row['gender'] == '0') {
                        return 'Male'
                    } else {
                        return 'Female'
                    }
                }
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    var button = '<td scope="row"><button id="btnEdit "onclick="Get(' + row['nik'] + ');" class="btn btn-sm btn-warning text-center" title="Edit Data" data-toggle="modal" data-target="#formEdit"> <i class="fa fa-edit"></i></button></td> \ <td scope = "row"><button id="btnDelete" onclick="Delete(' + row['nik'] + ');" class="btn btn-sm btn-danger text-center" title="Delete">  <i class="fa fa-trash"></i></button></td>';
                    return button;
                }
            }
        ]
    });

    $("#RegistForm").validate({
        rules: {
            "NIK": {
                required: true
            },
            "FirstName": {
                required: true
            },
            "LastName": {
                required: true
            },
            "Phone": {
                required: true
            },
            "BirthDate": {
                required: true
            },
            "Salary": {
                required: true
            },
            "Gender": {
                required: true
            },
            "Email": {
                required: true,
                email: true
            },
            "Password": {
                required: true
            },
            "Degree": {
                required: true
            },
            "GPA": {
                required: true
            },
            "University": {
                required: true
            },
            "Role": {
                required: true
            }
        },
        errorPlacement: function (error, element) { },
        highlight: function (element) {
            $(element).closest('.form-control').addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).closest('.form-control').removeClass('is-invalid');
            $(element).closest('.form-control').addClass('is-valid ');
        }
    });

    $('#btnSubmit').click(function (e) {
        e.preventDefault();
        if ($("#RegistForm").valid() == true) {
            Insert();
        }
    });

    $('#btnEdit').click(function (e) {
        e.preventDefault();
        if ($("#EditForm").valid() == true) {
            Edit();
        }
    });

    $('#btnAdd[data-toggle="modal"]').tooltip();
    $('#btnEdit[data-toggle="modal"]').tooltip();
    $('#btnExcel').tooltip();
    $('#btnDelete').tooltip();


    //Gender Chart
    var jumlah = [];
    var label = [];
    $.ajax({
        url: "https://localhost:44307/API/Employees/GetGender",
        success: function (result) {
            console.log(result.data);
            var dat = result.data.length;
            var kelamin = "";
            for (var i = 0; i < dat; i++) {
                jumlah.push(result.data[i].value);
                if (result.data[i].gender === 0) {
                    label.push("Male");
                } else {
                    label.push("Female");
                }
            }
        }
    })

    var options = {
        chart: {
            type: 'donut'
        },
        series: jumlah,
        labels: label
    }
    var chart = new ApexCharts(document.querySelector("#donutChart"), options);
    chart.render();

    //RoleChart
    var jumlahR = [];
    var labelR = [];
    $.ajax({
        url: "https://localhost:44307/API/Employees/GetRole",
        success: function (result) {
            console.log(result.data);
            var dat = result.data.length;
            var jabatan = "";
            for (var i = 0; i < dat; i++) {
                jumlahR.push(result.data[i].value);
                labelR.push(result.data[i].role);
            }
        }
    })

    var options = {
        chart: {
            type: 'pie'
        },
        series: jumlahR,
        labels: labelR
    }
    var chart = new ApexCharts(document.querySelector("#donutChart1"), options);
    chart.render();

    //Salary Chart
    var jumlahS = [];
    var labelS = [];
    $.ajax({
        url: "https://localhost:44307/API/Employees/GetSalary",
        success: function (result) {
            console.log(result.data);
            var dat = result.data.length;
            var gaji  = "";
            for (var i = 0; i < dat; i++) {
                jumlahS.push(result.data[i].value);
                labelS.push(result.data[i].label);
            }
        }
    })

    var options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        series: [{
            data: jumlahS
        }],
        xaxis: {
            categories: labelS
        }

    }
    var chart = new ApexCharts(document.querySelector("#donutChart2"), options);
    chart.render();

});



function Insert() {
    var obj = new Object();

    //ambil value dari tiap inputan di formnya
    obj.NIK = $("#inputNIK").val();
    obj.FirstName = $("#inputFirstName").val();
    obj.LastName = $("#inputLastName").val();
    obj.Phone = $("#inputPhone").val();
    obj.BirthDate = $("#inputBDate").val();
    obj.Salary = $("#inputSalary").val();
    obj.Gender = $("#inputGender").val();
    obj.Email = $("#inputEmail").val();
    obj.Password = $("#inputPassword").val();
    obj.Degree = $("#inputDegree").val();
    obj.GPA = $("#inputGPA").val();
    obj.UniversityId = $("#inputUniv").val();
    obj.RoleId = $("#inputRole").val();

    console.log(obj);
    //isi dari object yang dibuat sesuai dengan bentuk object yang akan di post
    $.ajax({
        url: "/Employees/Register",
        /* headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
         },*/
        'type': 'POST',
        'data': {entity: obj}, //objek kalian
        'dataType': 'json'
    }).done((result) => {
        $('#tableEmp').DataTable().ajax.reload();
        $("#formModal").modal("hide");
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Data telah ditambahkan!'
        });
    }).fail((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'Data gagal ditambahkan'
        });
    });

}

$.ajax({
    url: "https://localhost:44307/API/Universities",
    success: function (result) {
        console.log(result);
        var listuniv = "";
        $.each(result, function (key, val) {
            listuniv += `<option value="${val.universityId}">${val.name}</option>`;
        });
        $('#inputUniv').html(listuniv);
    }
})

$.ajax({
    url: "https://localhost:44307/API/Roles",
    success: function (result) {
        console.log(result);
        var listrole = "";
        $.each(result, function (key, val) {
            listrole += `<option value="${val.roleId}">${val.roleName}</option>`;
        });
        $('#inputRole').html(listrole);
    }
})

function Delete(nik) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#55B354',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/Employees/Delete/" + nik,
                type: "Delete"
            }).then((result) => {
                if (result == 200) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success',
                    );
                    $('#tableEmp').DataTable().ajax.reload();
                } else {
                    swal.fire("Data failed to delete");
                }
            });
        }
    })
}

function Get(nik) {
    $.ajax({
        url: "/Employees/Get/" + nik,
        success: function (result) {
            console.log(result);
            $("#editNIK").val(result.nik);
            $("#editFirstName").val(result.firstName);
            $("#editLastName").val(result.lastName);
            $("#editPhone").val(result.phone);
            var tanggal = result.birthDate.substr(0, 10);
            $('#editBDate').val(tanggal);
            $("#editSalary").val(result.salary);
            $("#editEmail").val(result.email);
            if (result.Gender === 'Male') {
                $('#editGender').val(0);
            } else {
                $('#editGender').val(1);
            }
        }
    })
}

function Edit() {
    var nik = $("#editNIK").val();
    var obj = new Object();

    //ambil value dari tiap inputan di formnya
    obj.NIK = $("#editNIK").val();
    obj.FirstName = $("#editFirstName").val();
    obj.LastName = $("#editLastName").val();
    obj.Phone = $("#editPhone").val();
    obj.BirthDate = $("#editBDate").val();
    obj.Salary = $("#editSalary").val();
    obj.Gender = $("#editGender").val();
    obj.Email = $("#editEmail").val();

    console.log(obj);
    //isi dari object yang dibuat sesuai dengan bentuk object yang akan di post
    $.ajax({
        url: "/Employees/Put/" + nik,
        /*headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },*/
        'type': 'Put',
        'data': {id: nik, entity:obj}, //objek kalian
        'dataType': 'json'
    }).done((result) => {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Data has been updated!'
        });
        $('#tableEmp').DataTable().ajax.reload();
        $("#formEdit").modal("hide");
    }).fail((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'Data gagal ditambahkan'
        });
    });

}

function ExportExcel() {
    var table = $('#tableEmp').DataTable();
    table.buttons('excel:name').trigger();
}



