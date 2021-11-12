// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
/*var item = document.querySelector('div#a');
function panggilAlert() {
    item.style.backgroundColor = 'salmon';
    alert("Anda mengklik tombol submit");
}

document.getElementById("vid").addEventListener('mouseenter', function () {
     var video = document.getElementById("vid");
     video.play();
});

*//*document.getElementById("btnPause").addEventListener('click', function () {
    var video = document.getElementById("vid");
    video.pause();
});*//*

document.getElementById("vid").addEventListener('mouseout', function () {
    var video = document.getElementById("vid");
    video.load();
});

$('#b').ready(function () {
   $("#b").click(function () {
      $("#c").slideDown("slow");
   });
});

$(document).ready(function () {
    $("h1").click(function () {
        $("h1").animate({ height: 'toggle' });
    });
});
*/

$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/",
    success: function (result) {
        console.log(result.results);
        var listpokemon = "";
        $.each(result.results, function (key, val) {
            listpokemon += `<tr>
                            <td>${val.name}</td>
                            <td><button class="btn btn-info btn-sm" onclick="detail('${val.url}')" data-url="${val.url}" data-toggle="modal" data-target="#modalPoke">Detail</button></td>
                            
                           </tr>`;
        });
        $('#tablePokemon').html(listpokemon);
    }
})

/*openNewWindow = function (url) {
    alert(url);
};*/

//using DataTables
$(document).ready(function () {
    $("#tablePoke").DataTable({
        'ajax': {
            'url': "https://pokeapi.co/api/v2/pokemon/",
            'dataSrc': 'results'
        },
        'columns': [
            {
                "data": "name"
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    return `<button class="btn btn-info btn-sm" onclick="detail('${row['url']}')" data-url="${row['url']}" data-toggle="modal" data-target="#modalPoke">Detail</button>
                            `;
                }
            }
        ]
    });
});

function detail(url) {
    console.log(url);
    listPoke = "";
    let type = "";
   // let ability = "";
    let move = "";
    let stat = "";
    $.ajax({
        url: url,
        success: function (result) {
            for (let i = 0; i < result.types.length; i++) {
                if (result.types[i].type.name == 'grass') {
                    type += `
                    <span class="badge badge-success">Grass</span>`;
                }
                if (result.types[i].type.name == 'poison') {
                    type += `
                    <span class="badge badge-dark">Poison</span>`;
                }
                if (result.types[i].type.name == 'fire') {
                    type += `
                    <span class="badge badge-danger">Fire</span>`;
                }
                if (result.types[i].type.name == 'flying') {
                    type += `
                    <span class="badge badge-warning">Flying</span>`;
                }
                if (result.types[i].type.name == 'water') {
                    type += `
                    <span class="badge badge-primary">Water</span>`;
                }
                if (result.types[i].type.name == 'bug') {
                    type += `
                    <span class="badge badge-secondary">Bug</span>`;
                }
                if (result.types[i].type.name == 'normal') {
                    type += `
                    <span class="badge badge-light">Normal</span>`;
                }
            }

/*
            for (let i = 0; i < result.abilities.length; i++) {
                ability += `${result.abilities[a].ability.name}"</br>`;
            }
*/
            let a = result.moves;
            for (let a = 0; a < 3; a++) {
                move += `${result.moves[a].move.name}</br>`;
            }

            for (j = 0; j < result.stats.length; j++) {
                if (j == 0) {
                    stat += ` 
               
                ${result.stats[0].stat.name} : ${result.stats[0].base_stat}</br>`;
                } else if (j == result.stats.length - 1) {
                    stat += `
                ${result.stats[j].stat.name} : ${result.stats[j].base_stat}</br>
                `;
                } else {
                    stat += `${result.stats[j].stat.name} : ${result.stats[j].base_stat}</br>`
                }
            }

            listPoke += `
                        <table class="table">
                        <tr>
                            <td colspan="3" style="text-align: center"><img src="${result.sprites.other.dream_world.front_default}"></td>
                         </tr>
                         <tr>
                            <td>Name</td>
                            <td class="font-weight-bold">${result.name}</td>
                         </tr>
                         <tr>
                            <td>Type</td>
                            <td>${type}</td>
                         </tr>
                         <tr>
                            <td>Move</td>
                            <td>${move}</td>
                         </tr>
                         <tr>
                            <td>Status</td>
                            <td>${stat}</td>
                         </tr>
                         </table>`;
                         
            $('.modal-body').html(listPoke);
        }
    })
}
  

//Employee
//using DataTables
$(document).ready(function () {
    $("#tableEmp").DataTable({
        'ajax': {
            'url': "https://localhost:44307/API/Employees",
            "datatype": "json",
            'dataSrc': 'result'
        },
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
                "data": "gender"
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    var button = '<td scope="row"><button onclick="Get(' + row['nik'] + ');" class="btn btn-sm btn-warning text-center" data-toggle="modal" data-target="#formEdit"> <i class="fa fa-edit"></i></button></td> \ <td scope = "row"><button onclick="Delete(' + row['nik'] + ');" class="btn btn-sm btn-danger text-center">  <i class="fa fa-trash"></i></button></td>';
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
        url: "https://localhost:44307/API/Employees/Register",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'type': 'POST',
        'data': JSON.stringify(obj), //objek kalian
        'dataType': 'json'
    }).done((result) => {
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Data telah ditambahkan!'
        });
        $('#tableEmp').DataTable().ajax.reload();
        $("#formModal").modal("hide");
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
        console.log(result.result);
        var listuniv = "";
        $.each(result.result, function (key, val) {
            listuniv += `<option value="${val.universityId}">${val.name}</option>`;
        });
        $('#inputUniv').html(listuniv);
    }
})

$.ajax({
    url: "https://localhost:44307/API/Roles",
    success: function (result) {
        console.log(result.result);
        var listrole = "";
        $.each(result.result, function (key, val) {
            listrole += `<option value="${val.roleId}">${val.roleName}</option>`;
        });
        $('#inputRole').html(listrole);
    }
})

function Delete(nik) {
    swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "https://localhost:44307/API/Employees/" + nik,
                type: "Delete"
            }).then((result) => {
                if (result.status == 200) {
                    swal.fire("Data has been deleted", {
                        icon: "success",
                    });
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
        url: "https://localhost:44307/API/Employees/" + nik,
        success: function (result) {
            console.log(result);
            $("#editNIK").val(result.result.nik);
            $("#editFirstName").val(result.result.firstName);
            $("#editLastName").val(result.result.lastName);
            $("#editPhone").val(result.result.phone);
            var tanggal = result.result.birthDate.substr(0, 10);
            $('#editBDate').val(tanggal);
            $("#editSalary").val(result.result.salary);
            $("#editEmail").val(result.result.email);
            if (result.result.Gender === 'Male') {
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
        url: "https://localhost:44307/API/Employees/" + nik,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'type': 'Put',
        'data': JSON.stringify(obj), //objek kalian
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

