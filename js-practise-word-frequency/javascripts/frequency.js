let current_count = 1;

function AddLoadEvent(func) {

    let current_load_event = window.onload;

    if (typeof current_load_event != 'function') {

        window.onload = func;

    } else {

        window.onload = function() {

            current_load_event;

            func;

        }

    }

}

function random_add_single_char() {
    let list = ["a", "x", "b", "d", "m", "a", "x", "b", "d", "m"];
    let new_index = parseInt(Math.random() * 10);
    return list[new_index];
}

function addToQueue() {
    let current_queue = document.getElementById("queue");
    let queue_text = current_queue.innerText;
    queue_text = queue_text.replace("[", "");
    queue_text = queue_text.replace("]", "");
    let array_q = [];
    if (queue_text.indexOf(",") == -1) {
        if (queue_text.length == 1) {
            array_q.push(queue_text);
        }
    } else {
        array_q = queue_text.split(",");
    }

    array_q.push(random_add_single_char());

    /* update text */
    current_queue.innerText = "[" + array_q.toString() + "]";


    return array_q;
}

function removeFromQueue() {
    let current_queue = document.getElementById("queue");
    let queue_text = current_queue.innerText;
    queue_text = queue_text.replace("[", "");
    queue_text = queue_text.replace("]", "");
    let array_q = queue_text.split(",");
    let array_q_length = array_q.length;

    array_q.pop();

    /* update text */
    current_queue.innerText = "[" + array_q.toString() + "]";
    if (array_q.length == 0) {
        alert("当前序列里已经没有任何字符了。")
    }

    return array_q;
}


function frequencyCalculate() {
    let current_queue = document.getElementById("queue");
    let queue_text = current_queue.innerText;
    queue_text = queue_text.replace("[", "");
    queue_text = queue_text.replace("]", "");
    let array_q = queue_text.split(",");
    let chars = [];
    let most_chars_count = 0;
    let most_chars_index_list = [];

    let result_control = document.getElementById("result");
    //获取样本
    array_q.forEach(function(ele) {
        if (chars.indexOf(ele) == -1) {
            let pairs = [ele, 0, []];
            chars.push(pairs);
        }
    });

    /* 统计频率 */
    chars.forEach(function(ele_pair, index) {
        array_q.forEach(function(ele_r, index_r) {
            if (ele_pair[0] == ele_r) {
                ele_pair[1]++;
                ele_pair[2].push(index_r);
            }
        });
    });


    let temp_array_list = [];
    /* 计算排名 */
    chars.forEach(function(ele, index) {
        if (most_chars_count < ele[1]) {
            most_chars_count = ele[1];
            most_chars_index_list = [];
            most_chars_index_list.push(ele);
            temp_array_list.push(ele[0]);
        } else if (most_chars_count == ele[1] && temp_array_list.indexOf(ele[0]) == -1) {

            most_chars_index_list.push(ele);
             temp_array_list.push(ele[0]);

        } else {

        }
    });

    /* result panel clear*/
    if (current_count > 10) {
        result_control.innerText = "";
        current_count = 1;
    }

    let final_result_positions = "";
    let final_result_chars = "";
    most_chars_index_list.forEach(function(element, index) {
        final_result_chars += element[0] + " ";
        final_result_positions += element[0] + " : " + element[2].toString() + "   ";
    });





    let result = "频率最高的为" + final_result_chars + ", 次数为 " + most_chars_count +
        ", 每一次出现的位置为 " + final_result_positions;

    let result_text = current_count + ".  当前序列: " + queue_text + ", 结果为 : ";

    result_text = result_text + result;
    if (queue_text == "") {
        result_text = "当前序列里已经没有任何字符了。";
    }


    let listitem_node = document.createElement("li");
    let textNode = document.createTextNode(result_text);
    listitem_node.appendChild(textNode);
    result_control.appendChild(listitem_node);
    current_count++;

    /* print */



}

function BindEvent() {
    let random_add_btn = document.getElementById("random_add");
    let remove_add_btn = document.getElementById("random_reduce");
    let calculator = document.getElementById("calculator");
    if (random_add_btn) {
        random_add_btn.onclick = function() {
            addToQueue();
        }
    }
    if (remove_add_btn) {
        remove_add_btn.onclick = function() {
            removeFromQueue();
        }
    }
    if (calculator) {
        calculator.onclick = function() {
            frequencyCalculate();
        }
    }
}

AddLoadEvent(BindEvent);
