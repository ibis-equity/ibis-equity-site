# greenlet.h C API Guide

This document explains the header file:

- [.venv/Include/site/python3.13/greenlet/greenlet.h](../.venv/Include/site/python3.13/greenlet/greenlet.h)

It complements the line-by-line explanation with line-range summaries, practical usage patterns, and safety notes for Python C extensions.

## 1) What This Header Provides

The file defines:

1. The public Greenlet object C type view.
2. A capsule-based C API table with 12 exported entries.
3. Macros that map API table slots to typed callable symbols.
4. A one-call import macro to initialize the API table.

## 2) Line-Range Walkthrough

### 2.1 Preamble, include guards, and C/C++ linkage

- [Lines 1-16](../.venv/Include/site/python3.13/greenlet/greenlet.h#L1)

What is here:
- Editor modeline and file description comment.
- Include guard start.
- Python.h include.
- extern C compatibility for C++ consumers.
- Deprecated GREENLET_VERSION constant.

Why it matters:
- Avoids duplicate declarations and C++ name mangling issues.

### 2.2 Core object struct shape

- [Lines 18-29](../.venv/Include/site/python3.13/greenlet/greenlet.h#L18)

What is here:
- implementation_ptr_t abstraction (void pointer for consumers).
- PyGreenlet struct with:
  - PyObject_HEAD
  - weak reference list
  - instance dict
  - opaque implementation pointer pimpl
- PyGreenlet_Check macro for runtime type checking.

Why it matters:
- Gives extensions a stable object envelope without exposing private internals.

### 2.3 API table index definitions

- [Lines 32-50](../.venv/Include/site/python3.13/greenlet/greenlet.h#L32)

What is here:
- Table size macro: PyGreenlet_API_pointers = 12.
- Numeric slot IDs for type objects, exceptions, and callable APIs.

Why it matters:
- All exported symbols are fetched by index from a capsule pointer table.

### 2.4 Consumer-side API binding macros

- [Lines 52-145](../.venv/Include/site/python3.13/greenlet/greenlet.h#L52)

What is here:
- _PyGreenlet_API pointer-table storage.
- Macro bindings for:
  - PyGreenlet_Type
  - PyExc_GreenletError
  - PyExc_GreenletExit
  - PyGreenlet_New
  - PyGreenlet_GetCurrent
  - PyGreenlet_Throw
  - PyGreenlet_Switch
  - PyGreenlet_SetParent
  - PyGreenlet_GetParent
  - PyGreenlet_MAIN
  - PyGreenlet_STARTED
  - PyGreenlet_ACTIVE
- Deprecated alias: PyGreenlet_GET_PARENT.

Why it matters:
- Consumers get strongly-cast call signatures while the ABI remains capsule-driven.

### 2.5 API import macro and footer

- [Lines 150-164](../.venv/Include/site/python3.13/greenlet/greenlet.h#L150)

What is here:
- PyGreenlet_Import macro that resolves capsule greenlet._C_API.
- End of GREENLET_MODULE conditional.
- End of extern C block and include guard.

Why it matters:
- No API call is safe until PyGreenlet_Import has succeeded.

## 3) Exported API Slots (Reference)

- Type slot: PyGreenlet_Type_NUM
- Exception slots: PyExc_GreenletError_NUM, PyExc_GreenletExit_NUM
- Constructor/accessors: PyGreenlet_New_NUM, PyGreenlet_GetCurrent_NUM
- Control transfer: PyGreenlet_Throw_NUM, PyGreenlet_Switch_NUM
- Parent operations: PyGreenlet_SetParent_NUM, PyGreenlet_GET_PARENT_NUM
- State queries: PyGreenlet_MAIN_NUM, PyGreenlet_STARTED_NUM, PyGreenlet_ACTIVE_NUM

## 4) Minimal C Extension Usage Pattern

```c
#include <Python.h>
#include "greenlet/greenlet.h"

static int init_greenlet_api(void) {
    PyGreenlet_Import();
    if (!_PyGreenlet_API) {
        return -1; /* import failed */
    }
    return 0;
}

static PyObject* my_current(PyObject* self, PyObject* args) {
    if (init_greenlet_api() < 0) {
        return NULL;
    }

    PyGreenlet* g = PyGreenlet_GetCurrent();
    if (!g) {
        Py_RETURN_NONE;
    }

    return (PyObject*)g; /* borrowed/owned semantics depend on API contract */
}
```

Notes:
- Call PyGreenlet_Import once during module init when possible.
- Guard use of mapped macros if API table import fails.

## 5) Ownership and Error-Handling Notes

Important note from header comments:
- [Lines 122-124](../.venv/Include/site/python3.13/greenlet/greenlet.h#L122) state PyGreenlet_GetParent may return NULL without an active exception.
- If non-NULL is returned, caller must decref when done.

Practical implication:
1. Check NULL return explicitly.
2. Do not assume NULL means Python exception is set.
3. Match reference counting responsibilities exactly.

## 6) Common Mistakes to Avoid

1. Using any API macro before PyGreenlet_Import.
2. Assuming NULL from PyGreenlet_GetParent always means error.
3. Forgetting reference decref on returned parent objects.
4. Depending on deprecated alias PyGreenlet_GET_PARENT for new code.
5. Treating GREENLET_VERSION as modern capability metadata.

## 7) Suggested Reading Order

1. Read object/type region first:
- [Lines 22-29](../.venv/Include/site/python3.13/greenlet/greenlet.h#L22)

2. Read slot definitions:
- [Lines 35-50](../.venv/Include/site/python3.13/greenlet/greenlet.h#L35)

3. Read callable macro bindings:
- [Lines 70-145](../.venv/Include/site/python3.13/greenlet/greenlet.h#L70)

4. Finish with import macro:
- [Lines 154-157](../.venv/Include/site/python3.13/greenlet/greenlet.h#L154)

## 8) One-Page Mental Model

1. _PyGreenlet_API is a function/type pointer table loaded from a capsule.
2. Macro names are typed wrappers over table slots.
3. PyGreenlet_Import initializes the table.
4. After import, you can create/query/switch/throw greenlets through C calls.
5. Parent and reference semantics need careful NULL and decref handling.
