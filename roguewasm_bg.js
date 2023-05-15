import { stats_updated } from './snippets/roguewasm-42f752944a168bbd/index.js';

let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
*/
export class Engine {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Engine.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_engine_free(ptr);
    }
    /**
    * @param {any} display
    */
    constructor(display) {
        const ret = wasm.engine_new(addHeapObject(display));
        return Engine.__wrap(ret);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} val
    */
    on_dig(x, y, val) {
        wasm.engine_on_dig(this.__wbg_ptr, x, y, val);
    }
    /**
    */
    draw_map() {
        wasm.engine_draw_map(this.__wbg_ptr);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    redraw_at(x, y) {
        wasm.engine_redraw_at(this.__wbg_ptr, x, y);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    place_box(x, y) {
        wasm.engine_place_box(this.__wbg_ptr, x, y);
    }
    /**
    * @param {PlayerCore} pc
    * @param {number} x
    * @param {number} y
    */
    open_box(pc, x, y) {
        _assertClass(pc, PlayerCore);
        wasm.engine_open_box(this.__wbg_ptr, pc.__wbg_ptr, x, y);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    mark_wasmprize(x, y) {
        wasm.engine_mark_wasmprize(this.__wbg_ptr, x, y);
    }
    /**
    * @param {PlayerCore} pc
    * @param {number} x
    * @param {number} y
    */
    move_player(pc, x, y) {
        _assertClass(pc, PlayerCore);
        wasm.engine_move_player(this.__wbg_ptr, pc.__wbg_ptr, x, y);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @returns {boolean}
    */
    free_cell(x, y) {
        const ret = wasm.engine_free_cell(this.__wbg_ptr, x, y);
        return ret !== 0;
    }
}
/**
*/
export class PlayerCore {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PlayerCore.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_playercore_free(ptr);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {string} icon
    * @param {string} color
    * @param {any} display
    */
    constructor(x, y, icon, color, display) {
        const ptr0 = passStringToWasm0(icon, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(color, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.playercore_new(x, y, ptr0, len0, ptr1, len1, addHeapObject(display));
        return PlayerCore.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    x() {
        const ret = wasm.playercore_x(this.__wbg_ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    y() {
        const ret = wasm.playercore_y(this.__wbg_ptr);
        return ret;
    }
    /**
    */
    draw() {
        wasm.playercore_draw(this.__wbg_ptr);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    move_to(x, y) {
        wasm.playercore_move_to(this.__wbg_ptr, x, y);
    }
    /**
    */
    emit_stats() {
        wasm.playercore_emit_stats(this.__wbg_ptr);
    }
    /**
    * @param {number} damage
    * @returns {number}
    */
    take_damage(damage) {
        const ret = wasm.playercore_take_damage(this.__wbg_ptr, damage);
        return ret;
    }
}

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbg_draw_8e7a66b23870be01(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).draw(arg1, arg2, getStringFromWasm0(arg3, arg4));
};

export function __wbg_alert_29e72f16952538bc(arg0, arg1) {
    alert(getStringFromWasm0(arg0, arg1));
};

export function __wbg_statsupdated_d142510794293d34(arg0) {
    stats_updated(takeObject(arg0));
};

export function __wbg_draw_08a30a76a54265c7(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    getObject(arg0).draw(arg1, arg2, getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
};

export function __wbindgen_json_parse(arg0, arg1) {
    const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

