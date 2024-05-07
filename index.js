const student_sum = document.getElementById("student_sum");
const desk_sum = document.getElementById("desk_sum");
const desk_place = document.getElementById("desk_place");
const motivate_num = document.getElementById("motivate_num");
const where_front = document.getElementById("where_front");
const change_seat = document.getElementById("change_seat");

let student,desk =[],notUse_desk = [];
let mae_people = [],mae_place = [];
// student 学生の数
// desk 机を保存
// mae_people 前に行きたい人を選ぶためのボタン->前に行きたい人の番号
// notUse_desk 使わない机の番号(id)

let desk_tate,desk_yoko;
function send_student_sum() {
    const student_num = document.getElementById("student_num");
    student = student_num.value;
    // console.log(student_num.value);
    // ステップ１　ー＞　ステップ２
    student_sum.classList.add("item_none");
    desk_sum.classList.remove("item_none");
}
function send_desk_sum() {
    const tate_num = document.getElementById("tate_num");
    desk_tate = tate_num.value;
    const yoko_num = document.getElementById("yoko_num");
    desk_yoko = yoko_num.value;
    if (student <= desk_tate*desk_yoko) {
        // console.log(student_num.value);
        // ステップ２　ー＞　ステップ３
        desk_sum.classList.add("item_none");
        desk_place.classList.remove("item_none");
        choose_desk();
    }
    else{
        console.log("席の数が足りません");
    }
}
let desk_choose_sum;
const now_desk_sum = document.getElementById("now_desk_sum");
function choose_desk(){
    //　ステップ３
    let num = 0;
    for (let i = 0; i < desk_tate; i++) {
        let new_retu = document.createElement("div");
        // new_retu.classList.add("");
        desk_place.appendChild(new_retu);

        for (let j = 0; j < desk_yoko; j++) {
            let new_desk = document.createElement("input");
            new_desk.classList.add("desk_btn");
            new_desk.type = "checkbox";
            new_desk.setAttribute('id',num);
            new_desk.setAttribute('checked',true);
            new_desk.setAttribute('onclick', 'pushDesk(this)');
            
            console.log(new_desk.checked);
            desk.push(new_desk);        //　机をdeskに保存
            new_retu.appendChild(new_desk);
            num++;
        }
        
    }
    desk_choose_sum = desk_tate*desk_yoko;
    now_desk_sum.textContent = desk_choose_sum + "席";
    let decision_btn = document.createElement("button");
    decision_btn.textContent = "決定";
    decision_btn.setAttribute('onclick', 'decision_desk()');
    desk_place.appendChild(decision_btn);

}
function pushDesk(btn) {
    if (btn.checked == true) {
        desk_choose_sum++;
    }
    else{
        desk_choose_sum--;
    }
    now_desk_sum.textContent = desk_choose_sum + "席";
}
function decision_desk() {
    if (student == desk_choose_sum) {
        //　ステップ３　ー＞　ステップ４
        desk_place.classList.add("item_none");
        motivate_num.classList.remove("item_none");
        go_motivate_num();
        get_desk_date(notUse_desk,false);
     }
     else{
         console.log("席と学生の数があっていません");
     }
}
function go_motivate_num() {
    console.log("ステップ４！");
    let mae_retu;
    for (let i = 0; i < student; i++) {
        //　生徒の数分のボタンを生成！
        if (i % 8 == 0 || i == 0) {
            mae_retu = document.createElement("div");
            motivate_num.appendChild(mae_retu);
        }
        let mae_btn = document.createElement("button");
        mae_btn.setAttribute('id',i+1);
        mae_btn.classList.add("mae_num");
        mae_btn.setAttribute('onclick', 'push_number(this)');
        mae_people.push(mae_btn);
        let mae_label = document.createElement("div");
        mae_label.textContent = i+1;
        mae_retu.appendChild(mae_btn);
        mae_btn.appendChild(mae_label);
    }
    let decision_btn = document.createElement("button");
    decision_btn.textContent = "決定";
    decision_btn.setAttribute('onclick', 'decision_mae()');
    motivate_num.appendChild(decision_btn);

}
function get_desk_date(data,judge) {
    // 机の配置を取得する関数
    for (let i = 0; i < desk.length; i++) {
        if (desk[i].checked == judge) {
            data.push(Number(desk[i].id));
        }
    }
}
function push_number(btn) {
    if (btn.classList[0] == "mae_num") {
        btn.classList.remove("mae_num");
        btn.classList.add("mae_num_checked");
    }
    else{
        btn.classList.remove("mae_num_checked");
        btn.classList.add("mae_num");
    }
}
function decision_mae() {
    let pre_mae = [];
    for (let i = 0; i < mae_people.length; i++) {
        if (mae_people[i].classList[0] == "mae_num_checked") {
            pre_mae.push(mae_people[i].id);
        }
    }
    mae_people = pre_mae;
    // ステップ４　ー＞　ステップ５
    motivate_num.classList.add("item_none");
    where_front.classList.remove("item_none");
    defend_mae();
    console.log(mae_people);
}

const mae_desk_sum = document.getElementById("mae_desk_sum");
let mae_choose_sum = 0;

function defend_mae() {
    //　ステップ５
    desk = [];
    let num = 0,not_use_num = 0;
    for (let i = 0; i < desk_tate; i++) {
        let new_retu = document.createElement("div");
        // new_retu.classList.add("");
        where_front.appendChild(new_retu);

        for (let j = 0; j < desk_yoko; j++) {
            let new_desk = document.createElement("input");
            new_desk.classList.add("desk_btn");
            new_desk.type = "checkbox";
            if (notUse_desk[not_use_num] == num) {
                new_desk.classList.add("item_hide");
                not_use_num++;
            }
            new_desk.setAttribute('id',num);
            // new_desk.setAttribute('checked',true);
            new_desk.setAttribute('onclick', 'pushFrontDesk(this)');
            
            // console.log(new_desk.checked);
            desk.push(new_desk);
            new_retu.appendChild(new_desk);
            num++;
        }
    }
    mae_desk_sum.textContent = mae_choose_sum + "席 / " + mae_people.length + "席";
    let decision_btn = document.createElement("button");
    decision_btn.textContent = "決定";
    decision_btn.setAttribute('onclick', 'decision_mae_def()');
    where_front.appendChild(decision_btn);
}

function pushFrontDesk(btn) {
    if (btn.checked == true) {
        mae_choose_sum++;
    }
    else{
        mae_choose_sum--;
    }
    mae_desk_sum.textContent = mae_choose_sum + "席 / " + mae_people.length + "席";
}
function decision_mae_def() {
    if (mae_choose_sum != mae_people.length) {
        console.log("前に行きたい人と前の席の数があっていません");
    }
    else{
        get_desk_date(mae_place,true);
        // ステップ５　ー＞　ステップ６
        where_front.classList.add("item_none");
        change_seat.classList.remove("item_none");

        changeSeat();
    }
}
function changeSeat() {
    console.log("changeSeat");
    //　ついに席替え！
    // j = Math.floor(Math.random() * 47) + 1;
    // 席の生成も一緒にやっちゃお
    let not_use_num = 0,num = 0,mae_num = 0,seat_number = 0;
    let student_seat = [];
    let student_desk = [];
    for (let i = 1; i <= student; i++) {
        student_seat.push(i);        
    }
    // console.log(student_seat);
    student_seat = shuffle(student_seat);
    // console.log(student_seat);
    //　前に行きたい人を動かしていく
    if (mae_people.length > 0) {
        mae_people = shuffle(mae_people);
        // console.log(mae_people);
    }
    // console.log(student_seat);

    // console.log(student_seat);
    for (let i = 0; i < desk_tate; i++) {
        let new_retu = document.createElement("div");
        new_retu.classList.add("desk_retsu");
        change_seat.appendChild(new_retu);

        for (let j = 0; j < desk_yoko; j++) {
            let new_desk = document.createElement("div");
            new_desk.classList.add("desk");
            new_desk.setAttribute('id',seat_number);
            if (notUse_desk[not_use_num] == seat_number) {
                new_desk.classList.add("item_hide");
                not_use_num++;
            }
            else{
                if (mae_people.length > 0) {
                    //　前に行きたい人がいるとき
                    if(mae_place[mae_num] == seat_number){
                        //　前の範囲内の時
                        let pre = student_seat[num];
                        //　すでに前にいる人(今の席)を取得
                        let k;
                        for (k = 0; k < student_seat.length; k++) {
                            if (student_seat[k] == mae_people[mae_num]) {
                                break;
                            }
                        }
                        student_seat[num] = mae_people[mae_num];
                        //　前を譲らせる
                        student_seat[k] = pre;
                        // 席を交換     

                        // console.log("if(mae_place[mae_num] == num)");
                        mae_num++;
                    }
                }
                new_desk.textContent = student_seat[num];
                num++;

            }
            // console.log(new_desk.checked);
            new_retu.appendChild(new_desk);
            student_desk.push(new_desk);
            seat_number++;
        }
    }
    first_frag = false;
    let oneMoreBtn = document.createElement("div");
    oneMoreBtn.textContent = "シャッフル";
    oneMoreBtn.setAttribute('onclick', 'oneMore()');
    change_seat.appendChild(oneMoreBtn);
}
function oneMore() {
    for (let i = 0; change_seat.children[i] != null; ) {
        change_seat.children[i].remove();
    }
    let title = document.createElement("div");
    title.textContent  ="席替え";
    change_seat.appendChild(title);
    let teacher_desk = document.createElement("div");
    teacher_desk.textContent  ="教卓";
    teacher_desk.classList.add("teacher_desk");
    change_seat.appendChild(teacher_desk);

    changeSeat();
}
function shuffle(data) {
    for (let i = 0; i < data.length; i++) {
        let  n = Math.floor(Math.random() * data.length);
        let pre = data[i];
        data[i] = data[n];
        data[n] = pre;
    }
    return data;
}