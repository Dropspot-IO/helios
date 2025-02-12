//@ts-check
// Eval common types

import {
    assert,
    assertClass,
    assertDefined
} from "./utils.js";

import {
    Word,
    Site
} from "./tokens.js";

import {
	UplcData
} from "./uplc-data.js";

import {
	HeliosData
} from "./helios-data.js";

/**
 * @typedef {import("./uplc-costmodels.js")}
 */
import { 
	NetworkParams
} from "./uplc-costmodels.js";


/**
 * @template {HeliosData} T
 * @typedef {import("./helios-data.js").HeliosDataClass<T>} HeliosDataClass
 */

/**
 * @internal
 * @typedef {{
 *   type:  string
 * } | {
 *   type:     "List"
 *   itemType: TypeSchema
 * } | {
 *   type:      "Map"
 *   keyType:   TypeSchema
 *   valueType: TypeSchema
 * } | {
 *   type:     "Option"
 *   someType: TypeSchema
 * } | {
 *   type:       "Struct"
 *   fieldTypes: NamedTypeSchema[]
 * } | {
 *   type:         "Enum"
 *   variantTypes: {name: string, fieldTypes: NamedTypeSchema[]}[]
 * }} TypeSchema
 */

/**
 * @internal
 * @typedef {{
 * 	 name: string
 * } & TypeSchema} NamedTypeSchema
 */

/**
 * @internal
 * @typedef {{
 *   name: string
 *   typeClass: TypeClass
 * }} ParameterI
 */

/**
 * @internal
 * @typedef {Map<ParameterI, Type>} InferenceMap
 */

/**
 * Used by the bundle cli command to generate a typescript annotations and (de)serialization code
 * inputTypes form a type union
 * @internal
 * @typedef {{
 *   inputType:    string
 *   outputType:   string
 *   internalType: TypeSchema
 * }} TypeDetails
 */

/**
 * @internal
 * @typedef {{[name: string]: (obj: any) => Promise<UplcData>}} JsToUplcHelpers
 */

/**
 * @internal
 * @typedef {{[name: string]: (data: UplcData) => Promise<any>}} UplcToJsHelpers
 */

/**
 * @internal
 * @typedef {(obj: any, helpers: JsToUplcHelpers) => Promise<UplcData>} JsToUplcConverter
 */

/**
 * @internal
 * @typedef {(data: UplcData, helpers: UplcToJsHelpers) => Promise<any>} UplcToJsConverter
 */

/**
 * @internal
 * @typedef {Named & Type & {
 *   asDataType:   DataType
 *   fieldNames:   string[]
 *   offChainType: (null | HeliosDataClass<HeliosData>)
 *   typeDetails?: TypeDetails
 *   jsToUplc:     JsToUplcConverter
 *   uplcToJs:     UplcToJsConverter
 *   ready:        boolean
 * }} DataType
 */

/**
 * @internal
 * @typedef {DataType & {
 *   asEnumMemberType: EnumMemberType
 *   constrIndex:      number
 *   parentType:       DataType
 * }} EnumMemberType
 */

/**
 * EvalEntities assert themselves
 * @internal
 * @typedef {{
 *   asDataType:       (null | DataType)
 *   asEnumMemberType: (null | EnumMemberType)
 *   asFunc:           (null | Func)
 *   asInstance:       (null | Instance)
 *   asMulti:          (null | Multi)
 *   asNamed:          (null | Named)
 *   asNamespace:      (null | Namespace)
 *   asParametric:     (null | Parametric)
 * 	 asType:           (null | Type)
 *   asTyped:          (null | Typed)
 *   asTypeClass:      (null | TypeClass)
 *   toString():       string
 * }} EvalEntity
 */

/**
 * @internal
 * @typedef {Typed & {
 *   asFunc: Func
 * 	 funcType: FuncType
 *   call(site: Site, args: Typed[], namedArgs?: {[name: string]: Typed}): (null | Typed | Multi)
 * }} Func
 */

/**
 * @internal
 * @typedef {Typed & {
 *   asInstance:      Instance
 *   fieldNames:      string[]
 *   instanceMembers: InstanceMembers
 * }} Instance
 */

/**
 * @internal
 * @typedef {EvalEntity & {
 *	 asMulti: Multi
 *   values:  Typed[]
 * }} Multi
 */

/**
 * @internal
 * @typedef {EvalEntity & {
 *   asNamed: Named
 *   name:    string
 *   path:    string
 * }} Named
 */

/**
 * @internal
 * @typedef {EvalEntity & {
 *   asNamespace: Namespace
 *   namespaceMembers: NamespaceMembers
 * }} Namespace
 */

/**
 * @internal
 * @typedef {EvalEntity & {
 *   asParametric: Parametric
 *   offChainType: (null | ((...any) => HeliosDataClass<HeliosData>))
 *   typeClasses: TypeClass[]
 *   apply(types: Type[], site?: Site): EvalEntity
 *   inferCall(site: Site, args: Typed[], namedArgs?: {[name: string]: Typed}, paramTypes?: Type[]): Func
 * 	 infer(site: Site, map: InferenceMap): Parametric
 * }} Parametric
 */

/**
 * @internal
 * @typedef {EvalEntity & {
 *   asType:               Type
 *   instanceMembers:      InstanceMembers
 *   typeMembers:          TypeMembers
 *   isBaseOf(type: Type): boolean
 *   infer(site: Site, map: InferenceMap, type: null | Type): Type
 *   toTyped():            Typed
 *   isParametric():       boolean
 * }} Type
 */

/**
 * @internal
 * @typedef {EvalEntity & {
 *   asTyped: Typed
 *   type: Type
 * }} Typed
 */

/**
 * @internal
 * @typedef {EvalEntity & {
 *   asTypeClass:                        TypeClass
 *   genInstanceMembers(impl: Type):     TypeClassMembers
 *   genTypeMembers(impl: Type):         TypeClassMembers
 *   isImplementedBy(type: Type):        boolean
 *   toType(name: string, path: string, parameter?: null | ParameterI): Type
 * }} TypeClass
 */

/**
 * @internal
 * @typedef {{[name: string]: (Parametric | Type)}} InstanceMembers
 */

/**
 * @internal
 * @typedef {{[name: string]: EvalEntity}} NamespaceMembers
 */

/**
 * @internal
 * @typedef {{[name: string]: (Parametric | Type | Typed)}} TypeMembers
 */

/**
 * @internal
 * @typedef {{[name: string]: Type}} TypeClassMembers
 */

/**
 * @internal
 * @param {Parametric} parametric
 * @param {Type[]} types
 * @returns {DataType}
 */
export function applyTypes(parametric, ...types) {
    return assertDefined(parametric.apply(types).asDataType);
}

/**
 * @internal
 */
export class Common {
	constructor() {
	}

	/**
	 * @returns {boolean}
	 */
	isParametric() {
		return false;
	}

    /**
     * @param {Typed} i 
     * @param {Type} t 
     * @returns {boolean}
     */
    static instanceOf(i, t) {
        return t.isBaseOf(i.type);
    }

    /**
     * @param {Type | Type[]} type 
     * @returns {Typed | Multi}
     */
    static toTyped(type) {
        if (Array.isArray(type)) {
            if (type.length === 1) {
                return Common.toTyped(type[0]);
            } else {
                return new MultiEntity(type.map(t => {
                    const typed = Common.toTyped(t).asTyped;
                    
                    if (!typed) {
                        throw new Error("unexpected nested Multi");
                    } else {
                        return typed;
                    }
                }));
            }
        } else {
			return type.toTyped();
        }
    }

	/**
	 * Compares two types. Throws an error if neither is a Type.
	 * @example
	 * Common.typesEq(IntType, IntType) == true
	 * @param {Type} a 
	 * @param {Type} b 
	 * @returns {boolean}
	 */
	static typesEq(a, b) {
		return a.isBaseOf(b) && b.isBaseOf(a);
	}

	/**
	 * @param {Type} type 
	 */
	static isEnum(type) {
		return Object.values(type.typeMembers).some(v => v.asEnumMemberType);
	}

	/**
	 * @param {Type} type 
	 */
	static countEnumMembers(type) {
		return Object.values(type.typeMembers).reduce((prev, v) => v.asEnumMemberType ? prev + 1 : prev, 0);
	}
  
    /**
     * @param {TypeClass} tc 
     * @returns {string[]}
     */
    static typeClassMembers(tc) {
        const dummy = tc.toType("", "");

        const typeMemberNames = Object.keys(tc.genTypeMembers(dummy)).sort();
        const instanceMemberNames = Object.keys(tc.genInstanceMembers(dummy)).sort();

        return typeMemberNames.concat(instanceMemberNames);
    }

    /**
     * @param {Type} type 
     * @param {TypeClass} tc 
     * @returns {boolean}
     */
    static typeImplements(type, tc) {
		if (type instanceof AllType || type.asDataType?.ready === false) {
			return true;
		}

        const typeMembers = tc.genTypeMembers(type);

        for (let k in typeMembers) {
            const check = type.typeMembers[k]?.asType;

            if ((check && !typeMembers[k].asType?.isBaseOf(check)) || !check) {
                return false;
            } 
        }

        const instanceMembers = tc.genInstanceMembers(type);

        for (let k in instanceMembers) {
            const check = type.instanceMembers[k]?.asType;

            if ((check && !instanceMembers[k].asType?.isBaseOf(check)) || !check) {
                return false;
            }
        }

        return true;
    }

    /**
     * @type {null | DataType}
     */
    get asDataType() {
        return null;
    }

    /**
     * @type {null | EnumMemberType}
     */
    get asEnumMemberType() {
        return null;
    }

    /**
     * @type {null | Func}
     */
    get asFunc() {
        return null;
    }

    /**
	 * @type {null | Instance}
	 */
	get asInstance() {
		return null;
	}

    /**
     * @type {null | Multi}
     */
    get asMulti() {
        return null;
    }

    /**
     * @type {null | Named}
     */
    get asNamed() {
        return null;
    }

    /**
	 * @type {null | Namespace}
	 */
	get asNamespace() {
		return null;
	}

    /**
     * @type {null | Parametric}
     */
    get asParametric() {
        return null;
    }

	/**
	 * @type {null | Type}
	 */
	get asType() {
		return null;
	}

    /**
     * @type {null | Typed}
     */
    get asTyped() {
        return this.asInstance ?? this.asFunc;
    }

	/**
	 * @type {null | TypeClass}
	 */
	get asTypeClass() {
		return null;
	}

	/**
	 * @type {boolean}
	 */
	get ready() {
		return true;
	}

	/**
	 * @param {any} obj
	 * @param {JsToUplcHelpers} helpers
	 * @returns {Promise<UplcData>}
	 */
	jsToUplc(obj, helpers) {
		throw new Error("not yet implemented");
	}

	/**
	 * @param {UplcData} data
	 * @param {UplcToJsHelpers} helpers
	 * @returns {Promise<any>}
	 */
	uplcToJs(data, helpers) {
		throw new Error("not yet implemented");
	}

    /**
     * @returns {string}
     */
    toString() {
        throw new Error("not yet implemented");
    }
}

/**
 * @internal
 * @implements {DataType}
 */
export class AllType extends Common {
	constructor() {
		super();
	}

	/**
	 * @type {DataType}
	 */
	get asDataType() {
		return this;
	}

	/**
	 * @type {Named}
	 */
	get asNamed() {
		return this;
	}

	/**
     * @type {Type}
     */
	get asType() {
        return this;
    }

	/**
	 * @type {HeliosDataClass<HeliosData> | null}
	 */
	get offChainType() {
		return null;
	}

	/**
	 * @type {string[]}
	 */
	get fieldNames() {
		return [];
	}

	/**
	 * @type {InstanceMembers}
	 */
	get instanceMembers() {
		return {};
	}

	/**
	 * @type {string}
	 */
	get name() {
		return "";
	}

	/**
	 * @type {string}
	 */
	get path() {
		return "";
	}

	/**
	 * @type {TypeMembers}
	 */
	get typeMembers() {
		return {}
	}

	/**
     * @param {Site} site 
     * @param {InferenceMap} map 
     * @param {null | Type} type 
     * @returns {Type}
     */
	infer(site, map, type) {
        return this;
    }

	/**
	 * @param {Type} other 
	 * @returns {boolean}
	 */
	isBaseOf(other) {
		return true;
	}

	/**
	 * @returns {Typed}
	 */
	toTyped() {
		throw new Error("can't be turned into a type");
	}

	/**
	 * @returns {string}
	 */
	toString() {
		return "All";
	}
}

/**
 * @internal
 * @implements {DataType}
 */
export class AnyType extends Common {
	constructor() {
		super();
	}

	get fieldNames() {
		return []
	}

	get offChainType() {
		return null;
	}

	/**
	 * @type {string}
	 */
	get name() {
		return "Any";
	}

	/**
	 * @type {string}
	 */
	get path() {
		return "";
	}

	/**
     * @type {Type}
     */
	get asType() {
        return this;
    }

	/**
	 * @type {Named}
	 */
	get asNamed() {
		return this;
	}

	/**
	 * @type {DataType}
	 */
	get asDataType() {
		return this;
	}

	/**
	 * @type {InstanceMembers}
	 */
	get instanceMembers() {
		return {};
	}
	
	/**
	 * @type {TypeMembers}
	 */
	get typeMembers() {
		return {}
	}

	/**
     * @param {Site} site 
     * @param {InferenceMap} map 
     * @param {null | Type} type 
     * @returns {Type}
     */
	infer(site, map, type) {
        return this;
    }

	/**
	 * @param {Type} other 
	 * @returns {boolean}
	 */
	isBaseOf(other) {
		return true;
	}

	/**
	 * @returns {Typed}
	 */
	toTyped() {
		throw new Error("can't be turned into a type");
	}

	/**
	 * @returns {string}
	 */
	toString() {
		return "Any";
	}
}

/**
 * Type of special case of no-return value where execution can't continue.
 * @internal
 * @implements {Type}
 */
export class ErrorType extends Common {
	constructor() {
        super();
	}

    /**
     * @type {InstanceMembers}
     */
    get instanceMembers() {
        return {};
    }

    /**
     * @type {TypeMembers}
     */
    get typeMembers() {
        return {};
    }

    /**
     * @type {Type}
     */
    get asType() {
        return this;
    }

    /**
     * @param {Site} site 
     * @param {InferenceMap} map 
     * @param {null | Type} type 
     * @returns {Type}
     */
    infer(site, map, type) {
        return this;
    }

	/**
	 * @param {Type} type 
	 * @returns {boolean}
	 */
	isBaseOf(type) {
		return type instanceof ErrorType;
	}

    /**
     * @returns {string}
     */
    toString() {
        return "()";
    }

	/**
	 * @returns {Typed}
	 */
	toTyped() {
		return new ErrorEntity();
	}
}

/**
 * @internal
 */
export class ArgType {
	#name;
	#type;
	#optional;

	/**
	 * 
	 * @param {null | Word} name 
	 * @param {Type} type 
	 * @param {boolean} optional 
	 */
	constructor(name, type, optional = false) {
		this.#name = name;
		this.#type = assertDefined(type);
		this.#optional = optional;
	}

	/**
	 * @type {string}
	 */
	get name() {
		if (this.#name === null) {
			return "";
		} else {
			return this.#name.toString();
		}
	}

	/**
	 * @type {Type}
	 */
	get type() {
		return this.#type;
	}

    /**
	 * @internal
	 * @param {Site} site 
	 * @param {InferenceMap} map 
	 * @param {null | Type} type 
	 * @returns {ArgType}
	 */
	infer(site, map, type) {
		return new ArgType(
			this.#name,
			this.#type.infer(site, map, type),
			this.#optional
		);
	}

    /**
	 * @param {ArgType} other 
	 * @returns {boolean}
	 */
	isBaseOf(other) {
		// if this arg has a default value, the other arg must also have a default value
		if (this.#optional && !other.#optional) {
			return false;
		}

		// if this is named, the other must be named as well
		if (this.#name != null) {
			return this.#name.toString() == (other.#name?.toString() ?? "");
		}

		if (!other.#type.isBaseOf(this.#type)) { // note the reversal of the check
			return false;
		}

		return true;
	}

	/**
	 * @returns {boolean}
	 */
	isNamed() {
		return this.#name !== null;
	}

	/**
	 * @returns {boolean}
	 */
	isOptional() {
		return this.#optional;
	}

	/**
	 * @returns {string}
	 */
	toString() {
		return [
			this.#name != null ? `${this.#name.toString()}: ` : "",
			this.#optional ? "?" : "",
			this.#type.toString()
		].join("");
	}
}

/**
 * Function type with arg types and a return type
 * @internal
 * @implements {Type}
 */
export class FuncType extends Common {
	/**
	 * @type {ArgType[]}
	 */
	#argTypes;

	/**
	 * @type {Type[]}
	 */
	#retTypes;

	/**
	 * @param {Type[] | ArgType[]} argTypes 
	 * @param {Type | Type[]} retTypes 
	 */
	constructor(argTypes, retTypes) {
        super();

		this.#argTypes = argTypes.map(at => (at instanceof ArgType) ? at : new ArgType(null, at));

		if (!Array.isArray(retTypes)) {
			retTypes = [retTypes];
		}

		this.#retTypes = retTypes;
	}

    /**
	 * @type {Type[]}
	 */
	get argTypes() {
		return this.#argTypes.slice().map(at => at.type);
	}

	/**
	 * @type {InstanceMembers}
	 */
	get instanceMembers() {
		return {};
	}

    /**
	 * @type {number}
	 */
	get nArgs() {
		return this.#argTypes.length;
	}

    /**
	 * @type {number}
	 */
	get nNonOptArgs() {
		return this.#argTypes.filter(at => !at.isOptional()).length;
	}

    /**
	 * @type {number}
	 */
	get nOptArgs() {
		return this.#argTypes.filter(at => at.isOptional()).length;
	}

    /**
	 * @type {Type[]}
	 */
	get retTypes() {
		return this.#retTypes;
	}

    /**
	 * @type {TypeMembers}
	 */
	get typeMembers() {
		return {};
	}

	/**
	 * @type {Type}
	 */
	get asType() {
		return this;
    }


	/**
	 * Checks if arg types are valid.
	 * Throws errors if not valid. Returns the return type if valid. 
	 * @param {Site} site 
	 * @param {Typed[]} posArgs
	 * @param {{[name: string]: Typed}} namedArgs
	 * @returns {null | Type[]}
	 */
	checkCall(site, posArgs, namedArgs = {}) {
		if (posArgs.length < this.nNonOptArgs) {
			// check if each nonOptArg is covered by the named args
			for (let i = 0; i < this.nNonOptArgs; i++) {
				if (!this.#argTypes[i].isNamed()) {
					site.typeError(`expected at least ${this.#argTypes.filter(at => !at.isNamed()).length} positional arg(s), got ${posArgs.length} positional arg(s)`);
					return null;
				} else if (!(this.#argTypes[i].name in namedArgs)) {
					site.typeError(`expected at least ${this.nNonOptArgs} arg(s), missing '${this.#argTypes[i].name}'`);
					return null;
				}
			}

		} else if (posArgs.length > this.#argTypes.length) {
			site.typeError(`expected at most ${this.#argTypes.length} arg(s), got ${posArgs.length} arg(s)`);
			return null;
		}

		for (let i = 0; i < posArgs.length; i++) {
			if (!Common.instanceOf(posArgs[i], this.#argTypes[i].type)) {
				site.typeError(`expected '${this.#argTypes[i].type.toString()}' for arg ${i + 1}, got '${posArgs[i].type.toString()}'`);
				return null;
			}
		}

		for (let key in namedArgs) {
			const i = this.#argTypes.findIndex(at => at.name == key);

			if (i == -1) {
				site.typeError(`arg named ${key} not found in function type ${this.toString()}`);
				continue;
			}

			if (i < posArgs.length) {
				site.typeError(`named arg '${key}' already covered by positional arg ${i+1}`);
				continue;
			}

			const thisArg = this.#argTypes[i];

			if (!Common.instanceOf(namedArgs[key], thisArg.type)) {
				site.typeError(`expected '${thisArg.type.toString()}' for arg '${key}', got '${namedArgs[key].toString()}`);
				continue;
			}
		}

		return this.#retTypes;
	}

    /**
	 * @internal
	 * @param {Site} site
	 * @param {InferenceMap} map 
	 * @param {null | Type} type 
	 * @returns {Type}
	 */
	infer(site, map, type) {
		if (!type) {
			return new FuncType(
				this.#argTypes.map(at => at.infer(site, map, null)),
				this.#retTypes.map(rt=> rt.infer(site, map, null))
			);
		} else if (type instanceof FuncType) {
			if (type.argTypes.length == this.#argTypes.length && type.retTypes.length == this.#retTypes.length) {
				return new FuncType(
					this.#argTypes.map((at, i) => at.infer(site, map, type.argTypes[i])),
					this.#retTypes.map((rt, i) => rt.infer(site, map, type.retTypes[i]))
				);
			}
		}

		throw site.typeError(`unable to infer type of ${this.toString()}`);
	}

    /**
	 * @internal
	 * @param {Site} site 
	 * @param {InferenceMap} map 
	 * @param {Type[]} argTypes 
	 * @returns {FuncType}
	 */
	inferArgs(site, map, argTypes) {
		if (argTypes.length == this.argTypes.length) {
			return new FuncType(
				this.#argTypes.map((at, i) => at.infer(site, map, argTypes[i])),
				this.#retTypes.map(rt => rt.infer(site, map, null))
			)
		}

		throw site.typeError(`expected ${this.argTypes.length} arg(s), got ${argTypes.length}`);
	}

    /** 
	 * Checks if any of 'this' argTypes or retType is same as Type.
	 * Only if this checks return true is the association allowed.
	 * @param {Site} site
	 * @param {Type} type
	 * @returns {boolean}
	 */
	isAssociated(site, type) {
		for (let arg of this.#argTypes) {
			if (Common.typesEq(arg.type, type)) {
				return true;
			}
		}

		for (let rt of this.#retTypes) {
			if (Common.typesEq(type, rt)) {
				return true;
			}
		}

		return false;
	}

    /**
	 * Checks if 'this' is a base type of another FuncType.
	 * The number of args needs to be the same.
	 * Each argType of the FuncType we are checking against needs to be the same or less specific (i.e. isBaseOf(this.#argTypes[i]))
	 * The retType of 'this' needs to be the same or more specific
	 * @param {Type} other 
	 * @returns {boolean}
	 */
	isBaseOf(other) {
		if (other instanceof FuncType) {
			if (this.nNonOptArgs != other.nNonOptArgs) {
				return false;
			} else {
				for (let i = 0; i < this.nNonOptArgs; i++) {
					if (!this.#argTypes[i].isBaseOf(other.#argTypes[i])) {
						return false;
					}
				}

				if (this.#retTypes.length === other.#retTypes.length) {
					for (let i = 0; i < this.#retTypes.length; i++) {
						if (!this.#retTypes[i].isBaseOf(other.#retTypes[i])) {
							return false;
						}
					}

					return true;
				} else {
					return false;
				}
			}

		} else {
			return false;
		}
	}

    /**
	 * Checks if the type of the first arg is the same as 'type'
	 * Also returns false if there are no args.
	 * For a method to be a valid instance member its first argument must also be named 'self', but that is checked elsewhere
	 * @param {Site} site 
	 * @param {Type} type 
	 * @returns {boolean}
	 */
	isMaybeMethod(site, type) {
		if (this.#argTypes.length > 0) {
			return Common.typesEq(this.#argTypes[0].type, type);
		} else {
			return false;
		}
	}

	/**
	 * @returns {string}
	 */
	toString() {
		if (this.#retTypes.length === 1) {
			return `(${this.#argTypes.map(a => a.toString()).join(", ")}) -> ${this.#retTypes.toString()}`;
		} else {
			return `(${this.#argTypes.map(a => a.toString()).join(", ")}) -> (${this.#retTypes.map(t => t.toString()).join(", ")})`;
		}
	}
	
	/**
	 * Throws an error if name isn't found
	 * @param {Site} site 
	 * @param {string} name 
	 * @returns {number}
	 */
	getNamedIndex(site, name) {
		const i = this.#argTypes.findIndex(at => at.name == name);

		if (i == -1) {
			throw site.typeError(`arg name ${name} not found`);
		} else {
			return i;
		}
	}

	/**
	 * @returns {Typed}
	 */
	toTyped() {
		return new FuncEntity(this);
	}
}

/**
 * @internal
 * @template {HeliosData} T
 * @typedef {{
 *   name: string,
 *   path?: string,
 *   offChainType?: HeliosDataClass<T> | null,
 *   genOffChainType?: (() => HeliosDataClass<T>) | null
 *   fieldNames?: string[],
 *   genInstanceMembers: (self: Type) => InstanceMembers,
 *   genTypeMembers: (self: Type) => TypeMembers
 *   genTypeDetails?: (self: Type) => TypeDetails,
 *   jsToUplc?: JsToUplcConverter
 *   uplcToJs?: UplcToJsConverter
 * }} GenericTypeProps
 */

/**
 * Created by statements
 * @internal
 * @template {HeliosData} T
 * @implements {DataType}
 */
export class GenericType extends Common {
    #name;

    /**
     * @type {string}
     */
    #path;

	#genOffChainType;
    #offChainType;
    #fieldNames;

	/**
	 * defer until needed
	 * @type {(self: Type) => InstanceMembers}
	 */
	#genInstanceMembers; 

	/**
	 * defer until needed
	 * @type {(self: Type) => TypeMembers}
	 */
	#genTypeMembers;

	/**
	 * @type {null | InstanceMembers}
	 */
	#instanceMembers;

	/**
	 * @type {null | TypeMembers}
	 */
	#typeMembers;

	/**
	 * @type {null | ((self: Type) => TypeDetails)}
	 */
	#genTypeDetails;

	#genDepth;

	/**
	 * @type {null | JsToUplcConverter}
	 */
	#jsToUplc;

	/**
	 * @type {null | UplcToJsConverter}
	 */
	#uplcToJs;

    /**
     * @param {GenericTypeProps<T>} props
     */
    constructor({
		name, 
		path, 
		offChainType, 
		genOffChainType, 
		fieldNames, 
		genInstanceMembers, 
		genTypeMembers, 
		genTypeDetails,
		jsToUplc,
		uplcToJs
	}) {
        super();

        this.#name = name;
        this.#path = path ?? `__helios__${name.toLowerCase()}`;
		this.#genOffChainType = genOffChainType ?? null;
        this.#offChainType = offChainType ?? null;
        this.#fieldNames = fieldNames ?? [];

		this.#genInstanceMembers = genInstanceMembers;
		this.#genTypeMembers = genTypeMembers;
		this.#instanceMembers = null;
		this.#typeMembers = null;
		this.#genTypeDetails = genTypeDetails ?? null;
		this.#genDepth = 0;
		this.#jsToUplc = jsToUplc ?? null;
		this.#uplcToJs = uplcToJs ?? null;
    }

    /**
     * @type {DataType}
     */
    get asDataType() {
        return this;
    }

    /**
     * @type {Named}
     */
    get asNamed() {
        return this;
    }

    /**
     * @type {Type}
     */
    get asType() {
        return this;
    }

    /**
     * @type {string[]}
     */
    get fieldNames() {
        return this.#fieldNames;
    }

    /**
     * @type {InstanceMembers}
     */
    get instanceMembers() {
		if (!this.#instanceMembers) {
			this.#instanceMembers = this.#genInstanceMembers(this);
		}

		return this.#instanceMembers;
    }

    /**
     * @type {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * @type {null | HeliosDataClass<T>}
     */
    get offChainType() {
		if (this.#offChainType) {
			return this.#offChainType;
		} else if (this.#genOffChainType) {
			return this.#genOffChainType();
		} else {
			return null;
		}
    }

	/**
	 * @type {TypeDetails}
	 */
	get typeDetails() {
		if (this.#genTypeDetails) {
			return this.#genTypeDetails(this);
		} else {
			throw new Error(`typeDetails not available for ${this.toString()}`)
		}
	}

    /**
     * @type {string}
     */
    get path() {
        return this.#path;
    }

	/**
	 * @type {boolean}
	 */
	get ready() {
		return this.#genDepth < 2;
	}

    /**
     * @type {TypeMembers}
     */
    get typeMembers() {
		if (!this.#typeMembers) {
			this.#genDepth += 1;
			this.#typeMembers = this.#genTypeMembers(this);
			this.#genDepth -= 1;
		}

		return this.#typeMembers;
    }

    /**
     * @param {Site} site 
     * @param {InferenceMap} map
     */
    applyInternal(site, map) {
		return {
			name: this.#name,
			path: this.#path,
			fieldNames: this.#fieldNames,
			genInstanceMembers: (self) => {
				/**
				 * @type {InstanceMembers}
				 */
				const instanceMembers = {};

				const oldInstanceMembers = this.#genInstanceMembers(self);

				for (let k in oldInstanceMembers) {
					const v = oldInstanceMembers[k];

					if (v.asParametric) {
						instanceMembers[k] = v.asParametric.infer(site, map);
					} else if (v.asType) {
						instanceMembers[k] = v.asType.infer(site, map, null);
					} else {
						throw new Error("unhandled");
					}
				}

				return instanceMembers;
			},
			genTypeMembers: (self) => {
				/**
				 * @type {TypeMembers}
				 */
				const typeMembers = {};

				const oldTypeMembers = this.#genTypeMembers(self);

				for (let k in oldTypeMembers) {
					const v = oldTypeMembers[k];

					if (v.asParametric) {
						typeMembers[k] = v.asParametric.infer(site, map);
					} else if (v.asTyped) {
						typeMembers[k] = v.asTyped.type.infer(site, map, null).toTyped();
					} else if (v.asType) {
						typeMembers[k] = v.asType.infer(site, map, null);
					} else {
						throw new Error("unhandled");
					}
				}

				return typeMembers;
			}
		}
    }

	/**
     * @param {Site} site 
     * @param {InferenceMap} map 
     * @param {null | Type} type 
     * @returns {Type}
     */
	infer(site, map, type) {
		return this;
	}

	/**
	 * @param {string} name 
	 * @param {string} path 
	 * @returns {GenericType}
	 */
	changeNameAndPath(name, path) {
		return new GenericType({
			name: name,
			path: path,
			fieldNames: this.#fieldNames,
			genInstanceMembers: this.#genInstanceMembers,
			genTypeMembers: this.#genTypeMembers
		});
	}

    /**
     * @param {Type} other 
     * @returns {boolean}
     */
    isBaseOf(other) {
		if (other.asEnumMemberType) {
			return this.isBaseOf(other.asEnumMemberType.parentType);
		} else if (other.asNamed) { 
			return other.asNamed.path == this.#path;
		} else {
			return false;
		}
    }

	/**
	 * @param {any} obj 
	 * @param {JsToUplcHelpers} helpers
	 * @returns {Promise<UplcData>}
	 */
	jsToUplc(obj, helpers) {
		if (this.#jsToUplc) {
			return this.#jsToUplc(obj, helpers);
		} else {
			throw new Error(`'${this.name}' doesn't support converting from JS to Uplc`);
		}
	}

	/**
	 * @param {UplcData} data
	 * @param {UplcToJsHelpers} helpers
	 * @returns {Promise<any>}
	 */
	uplcToJs(data, helpers) {
		if (this.#uplcToJs) {
			return this.#uplcToJs(data, helpers);
		} else {
			throw new Error(`'${this.name}' doesn't support converting from Uplc to JS`);
		}
	}

    /**
     * @returns {string}
     */
    toString() {
        return this.name;
    }

	/**
	 * @returns {Typed}
	 */
	toTyped() {
		return new DataEntity(this);
	}
}


/**
 * @internal
 * @template {HeliosData} T
 * @typedef {{
 *   name: string,
 *   path?: string,
 *   constrIndex: number,
 *   parentType: DataType,
 *   offChainType?: HeliosDataClass<T>,
 *   genOffChainType?: () => HeliosDataClass<T>,
 *   fieldNames?: string[],
 *   genInstanceMembers: (self: Type) => InstanceMembers,
 *   genTypeMembers?: (self: Type) => TypeMembers
 *   genTypeDetails?: (self: Type) => TypeDetails
 *   jsToUplc?: JsToUplcConverter
 *   uplcToJs?: UplcToJsConverter
 * }} GenericEnumMemberTypeProps
 */

/**
 * Created by statements
 * @internal
 * @template {HeliosData} T
 * @implements {EnumMemberType}
 * @extends {GenericType<T>}
 */
export class GenericEnumMemberType extends GenericType {
    #constrIndex;
    #parentType;

    /**
     * @param {GenericEnumMemberTypeProps<T>} props
     */
    constructor({
		name, 
		path, 
		constrIndex, 
		parentType, 
		offChainType, 
		genOffChainType, 
		fieldNames, 
		genInstanceMembers, 
		genTypeMembers,
		genTypeDetails,
		jsToUplc,
		uplcToJs
	}) {
        super({
            name, 
            path: path ?? `${parentType.path}__${name.toLowerCase()}`, 
			genOffChainType,
            offChainType, 
            fieldNames, 
            genInstanceMembers, 
            genTypeMembers: genTypeMembers ?? ((self) => ({})),
			genTypeDetails,
			jsToUplc,
			uplcToJs
        });

        this.#constrIndex = constrIndex;
        this.#parentType = parentType;
    }
    
    /**
     * @type {number}
     */
    get constrIndex() {
        return this.#constrIndex;
    }

    /**
     * @type {DataType}
     */
    get parentType() {
        return this.#parentType;
    }

    /**
     * @type {EnumMemberType}
     */
    get asEnumMemberType() {
        return this;
    }

	/**
     * @param {Site} site 
     * @param {InferenceMap} map 
     * @param {null | Type} type 
     * @returns {Type}
     */
	infer(site, map, type) {
		return this;
	}

	/**
	 * @param {Type} other 
	 * @returns {boolean}
	 */
	isBaseOf(other) {
		if (other instanceof GenericEnumMemberType) {
			return other.path == this.path;
		} else {
			return false;
		}
	}

	/**
	 * @returns {string}
	 */
    toString() {
        return `${this.#parentType.toString()}::${this.name}`;
    }
}


/**
 * Type of return-value of functions that don't return anything (eg. assert, print, error)
 * @internal
 * @implements {Type}
 */
export class VoidType extends Common {
	constructor() {
		super();
	}

	/**
     * @type {InstanceMembers}
     */
    get instanceMembers() {
        return {};
    }

    /**
     * @type {TypeMembers}
     */
    get typeMembers() {
        return {};
    }

    /**
     * @type {Type}
     */
    get asType() {
        return this;
    }

    /**
     * 
     * @param {Site} site 
     * @param {InferenceMap} map 
     * @param {null | Type} type 
     * @returns {Type}
     */
    infer(site, map, type) {
        return this;
    }

	/**
	 * @param {Type} type 
	 * @returns {boolean}
	 */
	isBaseOf(type) {
		return type instanceof VoidType;
	}

    /**
     * @returns {string}
     */
    toString() {
		return "()";
	}
	
	/**
	 * @returns {Typed}
	 */
	toTyped() {
		return new VoidEntity();
	}
}


/**
 * A regular non-Func Instance. DataValues can always be compared, serialized, used in containers.
 * @internal
 * @implements {Instance}
 */
export class DataEntity extends Common {
	#type;

	/**
	 * @param {DataType} type 
	 */
	constructor(type) {
        super();
		assert(!(type instanceof FuncType));
		this.#type = type;
	}

    /**
     * @type {string[]}
     */
    get fieldNames() {
        return this.#type.fieldNames;
    }

    /**
     * @type {InstanceMembers}
     */
    get instanceMembers() {
        return this.#type.instanceMembers;
    }

	/**
	 * @type {Type}
	 */
	get type() {
		return this.#type;
	}

    /**
     * @type {Instance}
     */
    get asInstance() {
        return this;
    }

	/**
	 * @type {Typed}
	 */
	get asTyped() {
		return this;
	}

	/**
	 * @returns {string}
	 */
	toString() {
		return this.#type.toString();
	}
}

/**
 * Returned by an error()
 * Special case of no-return-value that indicates that execution can't proceed.
 * @internal
 */
export class ErrorEntity extends Common {
	constructor() {
		super();
	}

	/**
	 * @type {string[]}
	 */
	get fieldNames() {
		return [];
	}

    /**
     * @type {InstanceMembers}
     */
    get instanceMembers() {
        return {};
    }

    /**
     * @type {Type}
     */
	get type() {
		return new ErrorType();
	}

    /**
     * @type {Instance}
     */
    get asInstance() {
        return this;
    }

	/**
	 * @type {Typed}
	 */
	get asTyped() {
		return this;
	}

	/**
	 * @returns {string}
	 */
	toString() {
		return "()";
	}
}

/**
 * @internal
 * @implements {Named}
 */
export class NamedEntity {
	#name;
	#path;
	#entity;

	/**
	 * @param {string} name 
	 * @param {string} path 
	 * @param {EvalEntity} entity
	 */
	constructor(name, path, entity) {
		this.#name = name;
		this.#path = path;
		this.#entity = entity;
	}

	/**
	 * @type {null | DataType}
	 */
	get asDataType() {
		return this.#entity.asDataType;
	}

	/**
	 * @type {null | EnumMemberType}
	 */
	get asEnumMemberType() {
		return this.#entity.asEnumMemberType;
	}

	/**
	 * @type {null | Func}
	 */
	get asFunc() {
		return this.#entity.asFunc;
	}

	/**
	 * @type {null | Instance}
	 */
	get asInstance() {
		return this.#entity.asInstance;
	}
	
	/**
	 * @type {null | Multi}
	 */
	get asMulti() {
		return this.#entity.asMulti;
	}

	/**
	 * @type {Named}
	 */
	get asNamed() {
		return this;
	}

	/**
	 * @type {null | Namespace}
	 */
	get asNamespace() {
		return this.#entity.asNamespace;
	}

	/**
	 * @type {null | Parametric}
	 */
	get asParametric() {
		return this.#entity.asParametric;
	}

	/**
	 * @type {null | Type}
	 */
	get asType() {
		return this.#entity.asType;
	}

	/**
	 * @type {null | Typed}
	 */
	get asTyped() {
		return this.#entity.asTyped;
	}

	/**
	 * @type {null | TypeClass}
	 */
	get asTypeClass() {
		return this.#entity.asTypeClass;
	}

	/**
	 * @type {string}
	 */
	get name() {
		return this.#name;
	}

	/**
	 * @type {string}
	 */
	get path() {
		return this.#path;
	}

	/**
	 * @returns {string}
	 */
	toString() {
		return this.#entity.toString();
	}
}

/**
 * A callable Instance.
 * @internal
 * @implements {Func}
 */
export class FuncEntity extends Common {
	/**
	 * @type {FuncType}
	 */
	#type;

	/**
	 * @param {FuncType} type
	 */
	constructor(type) {
        super();

		assert(type instanceof FuncType);

		this.#type = type;
	}

	/**
	 * @type {Type}
	 */
	get type() {
		return this.#type;
	}

    /**
	 * Returns the underlying FuncType directly.
	 * @type {FuncType}
	 */
	get funcType() {
		return this.#type;
	}

	/**
	 * @type {Func}
	 */
	get asFunc() {
		return this;
	}

	/**
	 * @type {Typed}
	 */
	get asTyped() {
		return this;
	}

    /**
	 * @param {Site} site 
	 * @param {Typed[]} args 
	 * @param {{[name: string]: Typed}} namedArgs
	 * @returns {null | Typed | Multi}
	 */
	call(site, args, namedArgs = {}) {
		const types = this.#type.checkCall(site, args, namedArgs);

		if (types === null) {
			return null;
		} else {
			return Common.toTyped(types);
		}
	}

	/**
	 * Returns a string representing the type.
	 * @returns {string}
	 */
	toString() {
		return this.#type.toString();
	}
}

/**
 * Wraps multiple return values
 * @internal
 * @implements {Multi}
 */
export class MultiEntity extends Common {
	#values;

	/**
	 * @param {Typed[]} values 
	 */
	constructor(values) {
        super();

		this.#values = values;
	}

    /**
	 * @param {(Typed | Multi)[]} vals
	 * @returns {Typed[]}
	 */
    static flatten(vals) {
        /**
         * @type {Typed[]}
         */
        let result = [];

        for (let v of vals) {
            if (v.asMulti) {
                result = result.concat(v.asMulti.values);
            } else if (v.asTyped) {
                result.push(v.asTyped);
            } else {
				throw new Error("unexpected");
			}
        }

        return result;
    }

	/**
	 * @type {Typed[]}
	 */
	get values() {
		return this.#values;
	}

    /**
	 * @type {Multi}
	 */
	get asMulti() {
		return this;
	}

	/**
	 * @returns {string}
	 */
	toString() {
		return `(${this.#values.map(v => v.toString()).join(", ")})`;
	}	
}

/**
 * @internal
 * @implements {Typed}
 */
export class TypedEntity extends Common {
	/**
	 * @type {Type}
	 */
	#type;

	/**
	 * @param {Type} type 
	 */
	constructor(type) {
		super();

		this.#type = type;
	}

	/**
	 * @returns {Typed}
	 */
	get asTyped() {
		return this
	}

	/**
	 * @type {Type}
	 */
	get type() {
		return this.#type;
	}
}

/**
 * Returned by functions that don't return anything (eg. assert, error, print)
 * @internal
 * @implements {Instance}
 */
export class VoidEntity extends Common {
	constructor() {
		super();
	}

	/**
	 * @type {string[]}
	 */
	get fieldNames() {
		return [];
	}

    /**
     * @type {InstanceMembers}
     */
    get instanceMembers() {
        return {};
    }

    /**
     * @type {Type}
     */
	get type() {
		return new VoidType();
	}

    /**
     * @type {Instance}
     */
    get asInstance() {
        return this;
    }

	/**
	 * @type {Typed}
	 */
	get asTyped() {
		return this;
	}

	/**
	 * @returns {string}
	 */
	toString() {
		return "()";
	}
}

/**
 * @internal
 * @implements {Namespace}
 */
export class ModuleNamespace extends Common {
	#members;

	/**
	 * @param {NamespaceMembers} members
	 */
	constructor(members) {
		super();
		this.#members = members;
	}

	/**
	 * @type {NamespaceMembers}
	 */
	get namespaceMembers() {
		return this.#members;
	}

	/**
	 * @type {Namespace}
	 */
	get asNamespace() {
		return this;
	}
}